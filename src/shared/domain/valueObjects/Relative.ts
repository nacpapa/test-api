import { InvalidArgumentError, Relatives } from 'shared/domain';
import { ValueObject } from './ValueObject';

export class Relative extends ValueObject<string> {
  public readonly name: string;

  constructor(value: string, name?: string) {
    super(value);
    this.name = name || 'Relative';
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        `<Relative> Error: Invalid value. <${this.name}> must be defined.`
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        `<Relative> Error: Invalid value. <${this.name}> must be type string.`
      );
    }

    if (!Relatives[this.value as keyof typeof Relatives]) {
      throw new InvalidArgumentError(
        `<Relative> Error: Invalid value. <${
          this.name
        }> must be one of the following values: ${Object.keys(Relatives).join(
          ', '
        )}.`
      );
    }
  }
}
