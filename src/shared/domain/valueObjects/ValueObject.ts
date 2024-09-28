export type Primitives = string | number | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  constructor(readonly value: T) {
    this.value = value;
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }

  toString(): string {
    return this.value.toString();
  }
}
