import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatuts } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTasksByID(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found!`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatuts.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTasksByID(id: string): void {
    const found = this.getTasksByID(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatusByID(id: string, status: TaskStatuts) {
    const task = this.getTasksByID(id);
    task.status = status;
    return task;
  }
}
