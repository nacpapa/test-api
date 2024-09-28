import { InvalidArgumentError } from '..';
import { ValueObject } from './ValueObject';

export class TextValue extends ValueObject<string> {
  private readonly name: string;

  constructor(value: string, name?: string) {
    const defaultName = name || 'TextValue';
    super(value);
    this.name = defaultName;
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Must be defined.`
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Must be a string.`
      );
    }

    if (/^\s*$/.test(this.value)) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Cannot be only whitespace.`
      );
    }

    if (this.value.length < 1) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Length must be at least 1.`
      );
    }

    //Postgres support 65535 characters but put limitation on 10000

    const maxLength = 10000;
    if (this.value.length > maxLength) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Length must not exceed ${maxLength}.`
      );
    }
  }
}
