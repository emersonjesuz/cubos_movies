import { MoviePrismaRepository } from "../shared/persistence/prisma/MoviePrismaRepository";
import { EmailResendService } from "../shared/services/email/EmailService";
import { QueueRabbitMQService, QueueService } from "../shared/services/queue/QueueService";
import { EmailUseCase } from "./EmailUseCase";

export class EmailConsumer {
  private readonly emailUseCase: EmailUseCase;
  private readonly queueService: QueueService;
  constructor() {
    this.emailUseCase = new EmailUseCase(new EmailResendService(), new MoviePrismaRepository());
    this.queueService = new QueueRabbitMQService();
  }
  public async sendReleaseMovie() {
    try {
      await this.queueService.consumer({
        queueName: "MOVIE",
        execute: async (payload) => {
          await this.emailUseCase.sendReleaseMovie(payload.id);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
