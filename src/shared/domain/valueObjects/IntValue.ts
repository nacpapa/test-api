import { InvalidArgumentError } from "..";
import { ValueObject } from "./ValueObject";

export class IntValue extends ValueObject<number> {
	private readonly name: string;

	constructor(
		value: string | number,
		name?: string,
		options?: { negative?: boolean; allowZero?: boolean },
	) {
		const defaultName = name || "IntValue";

		value = typeof value === "string" ? parseInt(value, 10) : value;

		if (!Number.isInteger(value)) {
			throw new InvalidArgumentError(
				`<${defaultName}> Error: Invalid value. Must be an integer.`,
			);
		}

		super(value);
		this.name = defaultName;
		this.ensureValueIsValid(options);
	}

	private ensureValueIsValid(options?: {
		negative?: boolean;
		allowZero?: boolean;
	}): void {
		const { negative = false, allowZero = false } = options || {};

		if (!negative && this.value < 0) {
			throw new InvalidArgumentError(
				`<${this.name}> Error: Invalid value. Must be positive.`,
			);
		}

		if (!allowZero && this.value === 0) {
			throw new InvalidArgumentError(
				`<${this.name}> Error: Invalid value. Must be non-zero.`,
			);
		}
	}
}
