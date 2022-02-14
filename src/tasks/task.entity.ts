import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatuts } from './tasks-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatuts;
}
