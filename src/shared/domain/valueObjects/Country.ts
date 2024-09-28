import { ValueObject } from './ValueObject';
import { CountriesEnum, InvalidArgumentError } from 'shared/domain';

export class Country extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<Country> Error: Invalid value. <Country> must be defined.'
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<Country> Error: Invalid value. <Country> must be type string.'
      );
    }

    if (!CountriesEnum[this.value as keyof typeof CountriesEnum]) {
      throw new InvalidArgumentError(
        `<Country> Error: Invalid value. <Country> must be one of the following values: ${Object.keys(
          CountriesEnum
        ).join(', ')}.`
      );
    }
  }
}
