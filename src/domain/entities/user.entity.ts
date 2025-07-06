import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Viewer' })
  role: 'Admin' | 'Editor' | 'Author' | 'Viewer';

  @CreateDateColumn()
  createdAt: Date;
}
