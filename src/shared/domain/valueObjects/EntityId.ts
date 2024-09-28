import { ValueObject } from './ValueObject';
import { InvalidArgumentError } from 'shared/domain';
import { randomUUID } from 'crypto';

export class EntityId extends ValueObject<string> {
  private readonly name: string;

  constructor(value: string, name?: string) {
    super(value);
    this.name = name || 'id';
    this.ensureEntityIdIsValid();
  }

  static getRandomUUID(): EntityId {
    return new EntityId(randomUUID());
  }

  private ensureEntityIdIsValid(): void {
    if (this.value === null || this.value === undefined) {
      throw new InvalidArgumentError(
        `<EntityId> Error: Invalid value. Parameter ${this.name} must be defined.`
      );
    }

    if (typeof this.value !== 'string') {
      throw new InvalidArgumentError(
        `<EntityId> Error: Invalid value. Parameter ${this.name} must be type string.`
      );
    }

    if (this.value.length !== 36) {
      throw new InvalidArgumentError(
        `<EntityId> the entered value is not valid. Parameter ${this.name} must be a valid uuid v4.`
      );
    }
  }
}
