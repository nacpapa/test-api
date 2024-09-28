import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class RegistrationCode extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<RegistrationCode> Error: Invalid value. <RegistrationCode> must be defined.'
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<RegistrationCode> Error: Invalid value. <RegistrationCode> must be type string.'
      );
    }

    if (this.value.length < 3) {
      throw new InvalidArgumentError(
        '<RegistrationCode> Error: Invalid value. <RegistrationCode> must have at least 4 characters.'
      );
    }

    if (this.value.length > 12) {
      throw new InvalidArgumentError(
        '<RegistrationCode> Error: Invalid value. <RegistrationCode> must have less than 12 characters.'
      );
    }
  }
}
