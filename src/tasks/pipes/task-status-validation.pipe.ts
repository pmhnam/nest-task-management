import { PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export default class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string) {
    console.log('value', value);
    if (!this.isStatusValid(value as TaskStatus)) {
      throw new Error(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: TaskStatus) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
