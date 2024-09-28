import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class ResourceUrl extends ValueObject<string> {
  public readonly name: string;

  constructor(value: string, name?: string) {
    // Date values must be initialized. Eg: super(new Date(value)
    super(value);
    this.name = name || 'ResourceUrl';
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        `<ResourceUrl> Error: Invalid value. <${this.name}> must be defined.`
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        `<ResourceUrl> Error: Invalid value. <${this.name}> must be type string.`
      );
    }

    if (this.value.length < 10) {
      throw new InvalidArgumentError(
        `${this.value} Error: Invalid value. <${this.name}> must have at least 10 characters.`
      );
    }

    if (this.value.length > 255) {
      throw new InvalidArgumentError(
        `<ResourceUrl> Error: Invalid value. <${this.name}> must have less than 255 characters.`
      );
    }
  }
}
