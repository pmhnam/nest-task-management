import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => String(value))
  @IsString()
  @IsNotEmpty()
  username: string;

  @Transform(({ value }) => String(value))
  @IsString()
  @IsNotEmpty()
  password: string;
}
