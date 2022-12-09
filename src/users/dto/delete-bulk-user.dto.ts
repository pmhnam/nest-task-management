import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeleteBulkUserDto {
  @IsNotEmpty()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  ids: string[];
}
