import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatuts } from '../tasks-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatuts)
  status?: TaskStatuts;

  @IsOptional()
  @IsString()
  search?: string;
}
