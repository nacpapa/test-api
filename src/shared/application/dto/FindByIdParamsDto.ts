import { Expose } from 'class-transformer';
import 'reflect-metadata';

export class FindByIdParamsDto {
  @Expose()
  id!: string;
}
