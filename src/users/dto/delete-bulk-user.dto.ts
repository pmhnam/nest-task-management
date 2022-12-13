import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteBulkUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  ids: string[];
}
