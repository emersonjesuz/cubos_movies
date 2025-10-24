import amqplib from "amqplib";

type Payload = {
  id: string;
  executedAt: number;
};
type ProducerInput = {
  executedAt: number;
  payload: Payload;
  queueName: string;
};

type ConsumerInput = {
  execute: (payload: Payload) => Promise<void>;
  queueName: string;
};

export interface QueueService {
  producer(input: ProducerInput): Promise<void>;
  consumer(input: ConsumerInput): Promise<void>;
}

export class QueueRabbitMQService implements QueueService {
  private readonly url = process.env.RABBIT_URL || "";
  async producer(input: ProducerInput): Promise<void> {
    const connection = await amqplib.connect(this.url);
    const channel = await connection.createChannel();
    await channel.assertQueue(input.queueName, {
      durable: true,
    });

    channel.sendToQueue(input.queueName, Buffer.from(JSON.stringify(input.payload)), {
      persistent: true,
    });

    await channel.close();
    await connection.close();
  }

  async consumer(input: ConsumerInput): Promise<void> {
    const connection = await amqplib.connect(this.url);
    const channel = await connection.createChannel();
    await channel.assertQueue(input.queueName, { durable: true });
    await channel.prefetch(1);

    channel.consume(input.queueName, async (msg) => {
      if (!msg) return;
      const payload = JSON.parse(msg.content.toString());
      const executeAt = new Date(payload.executedAt);
      const now = new Date();

      if (now >= executeAt) {
        const payload = JSON.parse(msg.content.toString());
        await input.execute(payload);
        channel.ack(msg);
      } else {
        setTimeout(() => {
          channel.nack(msg, false, true);
        }, 2000);
      }
    });
  }
}
