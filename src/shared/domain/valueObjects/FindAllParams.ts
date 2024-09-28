import { InvalidArgumentError } from 'shared/domain';
import z from 'zod';

export class FindAllParams {
  private _limit: number | undefined;
  private _offset: number | undefined;
  private _orderBy: string | undefined;
  private _order: 'asc' | 'desc' | undefined;

  constructor(params: {
    limit?: number | undefined;
    offset?: number | undefined;
    orderBy?: string | undefined;
    order?: 'asc' | 'desc' | undefined;
  }) {
    this._limit = params.limit;
    this._offset = params.offset;
    this._orderBy = params.orderBy;
    this._order = params.order;
    this.ensureValueIsValid();
  }

  private ensureValueIsValid(): void {
    this.ensureLimitIsValid();
    this.ensureOffsetIsValid();
    this.ensureOrderByIsValid();
  }

  private ensureLimitIsValid(): void {
    if (typeof this._limit !== 'undefined') {
      if (typeof this._limit !== 'number' || isNaN(this._limit))
        throw new InvalidArgumentError(
          'Invalid limit. Limit must be a number.'
        );

      if (this._limit < 0)
        throw new InvalidArgumentError(
          'Invalid limit. Limit must be greater than zero.'
        );

      if (this._limit > 1000)
        throw new InvalidArgumentError(
          'Invalid limit. Limit must be less than 1000.'
        );
    }
  }

  private ensureOffsetIsValid(): void {
    if (typeof this._offset !== 'undefined') {
      if (typeof this._offset !== 'number' || isNaN(this._offset))
        throw new InvalidArgumentError(
          'Invalid offset. Offset must be a number.'
        );

      if (this._offset < 0)
        throw new InvalidArgumentError(
          'Invalid offset. Offset must be greater than zero.'
        );
    }
  }

  private ensureOrderByIsValid(): void {
    if (
      typeof this.order !== 'undefined' &&
      typeof this.orderBy === 'undefined'
    ) {
      throw new InvalidArgumentError(
        "Invalid 'order' paramater. 'order' must be used with 'orderBy'."
      );
    }

    if (typeof this.orderBy !== 'undefined') {
      if (typeof this.order === 'undefined')
        throw new InvalidArgumentError(
          "Invalid 'orderBy' paramater. 'orderBy' must be used with 'order'."
        );

      try {
        z.string().parse(this.orderBy);
      } catch (error) {
        throw new InvalidArgumentError(
          "Invalid 'orderBy' paramater. 'orderBy' must be a string."
        );
      }

      try {
        z.enum(['asc', 'desc']).parse(this.order);
      } catch (error) {
        throw new InvalidArgumentError(
          "Invalid 'order' paramater. 'order' must be 'asc' or 'desc'."
        );
      }

      // validate regex for only letters minus or mayus
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(this.orderBy))
        throw new InvalidArgumentError(
          "Invalid 'orderBy' paramater. 'orderBy' must be only letters minus or mayus."
        );

      if (this.orderBy.length > 255)
        throw new InvalidArgumentError(
          "Invalid 'orderBy' paramater. 'orderBy' must be less than 255 characters."
        );
    }
  }

  get limit(): number | undefined {
    return this._limit;
  }

  get offset(): number | undefined {
    return this._offset;
  }

  get orderBy(): string | undefined {
    return this._orderBy;
  }

  get order(): 'asc' | 'desc' | undefined {
    return this._order;
  }
}
