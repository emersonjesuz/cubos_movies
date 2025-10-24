import { EmailConsumer } from "./email/EmailConsumer";

(async () => {
  const consumer = new EmailConsumer();
  console.log("Queue start.");
  await consumer.sendReleaseMovie();
})();
