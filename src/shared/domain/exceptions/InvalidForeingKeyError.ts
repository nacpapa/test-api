export class InvalidForeingKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidForeingKeyError';
  }
}
