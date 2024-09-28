export class ResourceNotFound extends Error {
  public defaultMessage: string;
  constructor(message?: string) {
    super(message);
    this.name = 'ResourceNotFound';
    this.defaultMessage = 'Resource not found.';
  }
}
