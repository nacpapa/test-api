import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';

export class FindAllParamsDto {
  @Expose()
  @Type(() => Number)
  limit?: number;

  @Expose()
  @Type(() => Number)
  offset?: number;

  @Expose()
  orderBy?: string;

  @Expose()
  order?: 'asc' | 'desc';
}
