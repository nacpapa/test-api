import { InvalidArgumentError } from '..';
import { ValueObject } from './ValueObject';

export class TaxId extends ValueObject<string> {
  private readonly name: string;

  constructor(value: string, name?: string) {
    const defaultName = name || 'TaxId';
    super(value);
    this.name = defaultName;
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Must be defined.`,
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Must be a string.`,
      );
    }

    if (/^\s*$/.test(this.value)) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Cannot be only whitespace.`,
      );
    }

    if (!/^\S+$/.test(this.value)) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Cannot contain whitespaces.`,
      );
    }

    if (!/^[a-zA-Z0-9]+$/.test(this.value)) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Must be alphanumeric.`,
      );
    }

    if (this.value.length < 10) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Length must be at least 10.`,
      );
    }

    const maxLength = 13;
    if (this.value.length > maxLength) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Length must not exceed ${maxLength}.`,
      );
    }
  }
}
