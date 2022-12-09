import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class QueryUserDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  offset?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  limit: number;

  @IsOptional()
  @Transform(({ value }) => String(value))
  username: string;
}
