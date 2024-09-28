import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';
import { z } from 'zod';

const phoneNumberSchema = z
  .string()
  .refine((data) => /^\+\d+(\s\d+)?$/.test(data), {
    message:
      '<PhoneNumber> Error: Invalid value. Phone number must contain only one space.',
  });

export class PhoneNumber extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        '<PhoneNumber> Error: Invalid value. <PhoneNumber> must be defined.',
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        '<PhoneNumber> Error: Invalid value. <PhoneNumber> must be type string.',
      );
    }

    if (this.value.length < 3) {
      throw new InvalidArgumentError(
        '<PhoneNumber> Error: Invalid value. <PhoneNumber> must have at least 3 characters.',
      );
    }

    if (this.value.length > 255) {
      throw new InvalidArgumentError(
        '<PhoneNumber> Error: Invalid value. <PhoneNumber> must have less than 255 characters.',
      );
    }

    try {
      phoneNumberSchema.parse(this.value);
    } catch (error: any) {
      throw new InvalidArgumentError(error.message);
    }
  }
}
