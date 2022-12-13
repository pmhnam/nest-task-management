import { ArrayMinSize, IsMongoId } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBulkUserDto extends PartialType(CreateUserDto) {
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  ids: string[];
}
