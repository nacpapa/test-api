import { InvalidArgumentError } from "..";
import { ValueObject } from "./ValueObject";

export class FloatValue extends ValueObject<number> {
	private readonly name: string;
	private readonly decimals: number;

	constructor(
		value: string | number,
		name?: string,
		options?: { negative?: boolean; allowZero?: boolean; decimals?: number },
	) {
		const defaultName = name || "FloatValue";

		value = typeof value === "string" ? parseFloat(value) : value;
		value = Number(value.toFixed(options?.decimals ?? 2));

		if (isNaN(value)) {
			throw new InvalidArgumentError(
				`<${defaultName}> Error: Invalid value. Must be a float.`,
			);
		}

		const { decimals = 2 } = options || {};

		if (!FloatValue.isValidFloat(value, decimals)) {
			throw new InvalidArgumentError(
				`<${defaultName}> Error: Invalid value. Must be a float with up to ${decimals} decimal places.`,
			);
		}

		super(value);

		this.name = defaultName;
		this.decimals = decimals;

		this.ensureValueIsValid(options);
	}

	private static isValidFloat(value: number, decimals: number): boolean {
		const factor = Math.pow(10, decimals);
		return Math.round(value * factor) / factor === value;
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
