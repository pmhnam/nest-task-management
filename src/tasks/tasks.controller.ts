import { Controller, Get } from '@nestjs/common';
import { ITask } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  private tasksService: TasksService;
  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getAllTasks(): ITask[] {
    return this.tasksService.getAllTasks();
  }
}
