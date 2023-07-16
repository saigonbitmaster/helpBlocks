// todo/dto/update-todo.dto.ts
import { BaseCaseDto } from './base.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCaseDto extends PartialType(BaseCaseDto) {
  completedAt?: Date;
}
