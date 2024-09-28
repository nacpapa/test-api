import { ValueObject } from "./ValueObject";
import { InvalidArgumentError } from "shared/domain";
import { CurrencyEnum } from "../enums";

export class Currency extends ValueObject<string> {
  public readonly name: string;

  constructor(value: string, name?: string) {
    // Date values must be initialized. Eg: super(new Date(value)
    super(value);
    this.name = name || "Currency";
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        `<Currency> Error: Invalid value. <${this.name}> must be defined.`
      );
    }

    if (typeof this.value !== "string") {
      throw new InvalidArgumentError(
        `<Currency> Error: Invalid value. <${this.name}> must be type string.`
      );
    }

    if (!CurrencyEnum[this.value as keyof typeof CurrencyEnum]) {
      throw new InvalidArgumentError(
        `<Currency> Error: Invalid value. <${
          this.name
        }> must be one of the following values: ${Object.keys(
          CurrencyEnum
        ).join(", ")}.`
      );
    }
  }
}
