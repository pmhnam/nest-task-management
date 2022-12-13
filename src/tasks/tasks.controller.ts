import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import GetTasksFilterDto from './dto/get-task-filter.dto';
import TaskStatusValidationPipe from './pipes/task-status-validation.pipe';
import { ITask, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  private tasksService: TasksService;
  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): ITask[] {
    return this.tasksService.getAllTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Body('id') id: string): ITask {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): ITask {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
