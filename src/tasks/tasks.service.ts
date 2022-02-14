import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatuts } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskRepository } from './task-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  getTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTask(filterDto);
  }

  async getTasksByID(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found!`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTasksByID(id: string): Promise<void> {
    const found = await this.tasksRepository.delete(id);

    if (found.affected === 0) {
      throw new NotFoundException(`Task with ID not found.`);
    }
  }

  async updateTaskStatusByID(id: string, status: TaskStatuts): Promise<Task> {
    const task = await this.getTasksByID(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
