import bcrypt from "bcrypt";
export interface PasswordEncoder {
  encode(password: string): Promise<string>;
  matches(password: string, passwordHash: string): Promise<boolean>;
}

export class BcryptPasswordEncoder implements PasswordEncoder {
  async encode(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async matches(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
