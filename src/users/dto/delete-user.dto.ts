import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id: string;
}
