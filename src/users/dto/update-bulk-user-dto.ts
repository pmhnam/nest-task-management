import { Transform } from 'class-transformer';
import { ArrayMinSize, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateBulkUserDto {
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  ids: string[];

  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  username: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  password: string;
}
