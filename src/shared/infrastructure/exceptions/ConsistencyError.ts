export class ConsistencyError extends Error {
  public defaultMessage: string;
  constructor(message?: string) {
    super(message);
    this.name = 'ConsistencyError';
    this.defaultMessage = 'Consistency error. Please try again later.';
    this.sendAlert();
  }

  sendAlert(): void {
    console.log('**************************************');
    console.log('WARNING: Consistency error');
    console.log('**************************************');
    console.log(this.name);
    console.log(this.message);
    console.log('**************************************');
  }
}
