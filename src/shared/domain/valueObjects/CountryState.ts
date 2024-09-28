import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class CountryState extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<CountryState> Error: Invalid value. <CountryState> must be defined.'
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<CountryState> Error: Invalid value. <CountryState> must be type string.'
      );
    }

    if (this.value.length < 2) {
      throw new InvalidArgumentError(
        '<CountryState> Error: Invalid value. <CountryState> must have at least 3 characters.'
      );
    }

    if (this.value.length > 255) {
      throw new InvalidArgumentError(
        '<CountryState> Error: Invalid value. <CountryState> must have less than 255 characters.'
      );
    }
  }
}
