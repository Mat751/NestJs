import { IsEnum } from 'class-validator';
import { TaskStatuts } from '../tasks.model';

export class UpdateTaskStatusDto {
  //controlla che il nuovo stato faccia parte del task status
  @IsEnum(TaskStatuts)
  status: TaskStatuts;
}
