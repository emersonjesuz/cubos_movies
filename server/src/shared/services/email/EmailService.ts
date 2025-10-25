import { Resend } from "resend";

type EmailInput = {
  email: string;
  subject: string;
  html: string;
};

export interface EmailService {
  send(input: EmailInput): Promise<void>;
}

export class EmailResendService implements EmailService {
  private readonly SECRET = process.env.EMAIL_SECRET;
  private readonly FROM_EMAIL = process.env.FROM_EMAIL;
  async send(input: EmailInput): Promise<void> {
    const resend = new Resend(this.SECRET);
    const { data, error } = await resend.emails.send({
      from: this.FROM_EMAIL || "onboarding@resend.dev",
      to: input.email,
      subject: input.subject,
      html: input.html,
      scheduledAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    });

    if (error) {
      throw new Error("Error send email.");
    }
  }
}
