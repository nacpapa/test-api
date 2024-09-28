import { InvalidArgumentError } from '..';
import { ValueObject } from './ValueObject';

export class DateValue extends ValueObject<Date> {
  public readonly name: string;

  constructor(value: Date, name?: string) {
    const defaultName = name || 'DateValue';

    if (value === null || value === undefined) {
      throw new InvalidArgumentError(
        `<${defaultName}>  Error: Invalid value. <${defaultName}> must be defined.`
      );
    }

    const date = new Date(value);
    super(date);
    this.name = defaultName;
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (!(this.value instanceof Date)) {
      throw new InvalidArgumentError(
        `<${this.name}> Error: Invalid value. <${this.name}> must be a Date object.`
      );
    }
  }
}
