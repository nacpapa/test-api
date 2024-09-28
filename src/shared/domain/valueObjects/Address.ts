import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class Address extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<Address> Error: Invalid value. <Address> must be defined.'
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<Address> Error: Invalid value. <Address> must be type string.'
      );
    }

    if (this.value.length < 3) {
      throw new InvalidArgumentError(
        '<Address> Error: Invalid value. <Address> must have at least 3 characters.'
      );
    }

    if (this.value.length > 255) {
      throw new InvalidArgumentError(
        '<Address> Error: Invalid value. <Address> must have less than 255 characters.'
      );
    }
  }
}
