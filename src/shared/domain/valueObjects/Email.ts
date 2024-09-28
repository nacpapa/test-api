import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class Email extends ValueObject<string> {
  private readonly emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<Email> Error: Invalid value. <Email> must be defined.'
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<Email> Error: Invalid value. <Email> must be type string.'
      );
    }

    if (this.value.length < 3) {
      throw new InvalidArgumentError(
        '<Email> Error: Invalid value. <Email> must have at least 3 characters.'
      );
    }

    if (this.value.length > 255) {
      throw new InvalidArgumentError(
        '<Email> Error: Invalid value. <Email> must have less than 255 characters.'
      );
    }

    if (!this.emailRegex.test(this.value)) {
      throw new InvalidArgumentError(
        '<Email> Error: Invalid value. <Email> must be a valid email address.'
      );
    }
  }
}
