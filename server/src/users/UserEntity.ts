export class UserEntity {
  private id?: string;
  private name: string;
  private email: string;
  private password: string;

  constructor(name: string, email: string, password: string, id?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public getId(): string {
    return this.id!;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string) {
    this.email = value;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(value: string) {
    this.password = value;
  }
}
