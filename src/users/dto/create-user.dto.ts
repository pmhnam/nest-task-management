import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @Transform(({ value }) => String(value))
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @Transform(({ value }) => String(value))
  @IsString()
  @IsNotEmpty()
  password: string;
}
