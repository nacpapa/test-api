import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class PostalCode extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<PostalCode> Error: Invalid value. <PostalCode> must be defined.'
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<PostalCode> Error: Invalid value. <PostalCode> must be type string.'
      );
    }

    if (this.value.length < 3) {
      throw new InvalidArgumentError(
        '<PostalCode> Error: Invalid value. <PostalCode> must have at least 3 characters.'
      );
    }

    if (this.value.length > 255) {
      throw new InvalidArgumentError(
        '<PostalCode> Error: Invalid value. <PostalCode> must have less than 255 characters.'
      );
    }
  }
}
