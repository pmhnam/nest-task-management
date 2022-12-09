import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  username: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => String(value))
  password: string;
}
