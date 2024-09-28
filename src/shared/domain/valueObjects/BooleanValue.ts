import { InvalidArgumentError } from '..';
import { ValueObject } from './ValueObject';

export class BooleanValue extends ValueObject<boolean> {
  private readonly name: string;

  constructor(value: boolean, name?: string) {
    const defaultName = name || 'BooleanValue';
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

    if (typeof this.value !== 'boolean') {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. Must be a boolean.`
      );
    }
  }
}
