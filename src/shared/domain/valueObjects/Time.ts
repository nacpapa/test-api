import { ValueObject } from './ValueObject'
import { InvalidArgumentError } from 'shared/domain';

export class Time extends ValueObject<Date> {
    public readonly name: string;

    constructor(
        value: Date,
        name?: string
    ) {
        const date = new Date(value)
        super(date);
        this.name = name || 'Time';
        this.ensureValueIsValid();
    }

    private ensureValueIsValid(): void {
        if(this.value === null || this.value === undefined) {
            throw new InvalidArgumentError(`<Time> Error: Invalid value. <${this.name}> must be defined.`);
        }

        if(typeof this.value !== 'object') {
            throw new InvalidArgumentError(`<Time> Error: Invalid value. <${this.name}> must be type Date.`);
        }

        if(isNaN(this.value.getTime())) {
            throw new InvalidArgumentError(`<Time> Error: Invalid value. <${this.name}> must be a valid date. Eg: YYYY-MM-DD`);
        }

        if(this.value > new Date) {
            throw new InvalidArgumentError(`<Time> Error: Invalid value. <${this.name}> must be a date before now.`);
        }

    }
}
