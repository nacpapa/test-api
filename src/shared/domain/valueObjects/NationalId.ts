import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class NationalId extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<NationalId> Error: Invalid value. <NationalId> must be defined.'
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<NationalId> Error: Invalid value. <NationalId> must be type string.'
      );
    }

    if (this.value.length < 3) {
      throw new InvalidArgumentError(
        '<NationalId> Error: Invalid value. <NationalId> must have at least 3 characters.'
      );
    }

    if (this.value.length > 42) {
      throw new InvalidArgumentError(
        '<NationalId> Error: Invalid value. <NationalId> must have less than 255 characters.'
      );
    }
  }
}
