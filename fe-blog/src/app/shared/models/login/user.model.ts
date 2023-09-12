export class User {
  constructor(
    private username: string,
    private token: string,
    public userId: string,
    private expiresIn: Date
  ) {}

  get expireDate() {
    return this.expiresIn;
  }

  get userToken() {
    return this.token;
  }
}
