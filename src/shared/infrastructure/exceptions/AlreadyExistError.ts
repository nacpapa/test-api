export class AlreadyExistError extends Error {
  public defaultMessage: string;
  constructor(target?: string, message?: string) {
    super(message);
    this.name = 'AlreadyExist';
    this.defaultMessage = target
      ? `Error '${target}' already exist.`
      : 'Resource already exist';
  }
}
