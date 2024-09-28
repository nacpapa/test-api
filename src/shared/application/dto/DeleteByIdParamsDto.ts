import { Expose } from 'class-transformer';
import 'reflect-metadata';

export class DeleteByIdParamsDto {
  @Expose()
  id!: string;
}
