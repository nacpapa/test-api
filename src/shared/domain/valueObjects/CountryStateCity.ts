import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class CountryStateCity extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<CountryStateCity> Error: Invalid value. <CountryStateCity> must be defined.'
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<CountryState> Error: Invalid value. <CountryState> must be type string.'
      );
    }

    if (this.value.length < 2) {
      throw new InvalidArgumentError(
        '<CountryStateCity> Error: Invalid value. <CountryStateCity> must have at least 2 characters.'
      );
    }

    if (this.value.length > 255) {
      throw new InvalidArgumentError(
        '<CountryStateCity> Error: Invalid value. <CountryStateCity> must have less than 255 characters.'
      );
    }
  }
}
