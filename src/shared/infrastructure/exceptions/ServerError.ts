export class ServerError extends Error {
  public defaultMessage: string;
  constructor(message: string) {
    super(message);
    this.name = 'ServerError';
    this.defaultMessage = 'Something went wrong. Please try again later.';
    this.sendAlert();
  }

  sendAlert(): void {
    console.log('**************************************');
    console.log('WARNING: Server error');
    console.log('**************************************');
    console.log(this.name);
    console.log(this.message);
    console.log('**************************************');
  }
}
