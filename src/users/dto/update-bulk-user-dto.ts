import { ArrayMinSize, IsMongoId } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBulkUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  ids: string[];
}
