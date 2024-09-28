import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';

export class Birthdate extends ValueObject<Date> {
  constructor(value: Date) {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(
        '<Birthdate> Error: Invalid value. <Birthdate> must be defined.'
      );
    }
    super(new Date(value));
    this.ensureValueIsValid();
  }

  public getAge(): number {
    const today: Date = new Date();
    const birthDate: Date = new Date(this.value);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public isAdult(): boolean {
    return this.getAge() >= 18;
  }

  public isMinor(): boolean {
    return this.getAge() < 18;
  }

  private ensureValueIsValid(): void {
    if (!(new Date(this.value))) {
      throw new InvalidArgumentError(
        '<Birthdate> Error: Invalid value. <Birthdate> must be type exist.'
      );
    }

    if (!(this.value instanceof Date)) {
      throw new InvalidArgumentError(
        '<Birthdate> Error: Invalid value. <Birthdate> must be type Date.'
      );
    }

    /* if (isNaN(this.value.getTime())) {
      throw new InvalidArgumentError(
        '<Birthdate> Error: Invalid value. <Birthdate> must be a valid date. Eg: YYYY-MM-DD'
      );
    } */

    if (this.value > new Date()) {
      throw new InvalidArgumentError(
        '<Birthdate> Error: Invalid value. <Birthdate> must be a date before now.'
      );
    }

    if (this.getAge() > 150) {
      throw new InvalidArgumentError(
        '<Birthdate> Error: Invalid value. <Birthdate> must be earlier than 150 years ago.'
      );
    }
  }
}
