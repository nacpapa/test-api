export enum ErrorTypes {
  BusinessRuleViolation,
  ResourceNotFound,
  InvalidParameter,
}

const DefaultErrorMessages: { [key in ErrorTypes]: string } = {
  [ErrorTypes.BusinessRuleViolation]: 'Business rule violation.',
  [ErrorTypes.ResourceNotFound]: 'Requested resource not found.',
  [ErrorTypes.InvalidParameter]: 'Invalid parameters.',
};

class ApplicationError {
  constructor(
    public readonly type: ErrorTypes,
    public readonly message: string,
  ) {}
}

export class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly error: ApplicationError | null = null,
    private readonly value?: T,
  ) {
    if (isSuccess && error) {
      throw new Error('Operación exitosa no puede contener error');
    }
    if (!isSuccess && !error) {
      throw new Error('Debe proporcionar un mensaje de error para fallas');
    }
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static failure<U>(errorType: ErrorTypes, message?: string): Result<U> {
    return new Result<U>(
      false,
      new ApplicationError(
        errorType,
        message ?? DefaultErrorMessages[errorType],
      ),
    );
  }

  public getValue(): T | undefined {
    if (!this.isSuccess) {
      throw new Error('No se puede obtener el valor de un resultado fallido');
    }
    return this.value;
  }

  public getError(): ApplicationError {
    if (this.isSuccess) {
      throw new Error('No se puede obtener el error de un resultado exitoso');
    }
    return this.error!;
  }
}
