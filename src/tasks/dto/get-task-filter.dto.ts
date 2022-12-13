import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';
import { ApiProperty } from '@nestjs/swagger';

export default class GetTasksFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
