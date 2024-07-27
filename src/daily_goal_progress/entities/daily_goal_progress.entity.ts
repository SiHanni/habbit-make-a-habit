import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UsersHabit } from 'src/user/users_habits/entities/users_habit.entity';
import { UsersPoint } from 'src/user/users_points/entities/users_point.entity';

@Entity('daily_goal_progress')
export class DailyGoalProgress {
  @PrimaryGeneratedColumn({ name: 'id' })
  dailyGoalId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  createdAt: Date;

  @Column({ name: 'progress_time', default: 0 })
  progressTime: number;

  @Column({ name: 'is_finished', default: false })
  isFinished: boolean;

  @Column({
    name: 'confirmed_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  confirmedAt: Date;

  @Column({ name: 'on_progress' })
  onProgress: boolean;

  @CreateDateColumn({
    name: 'last_start_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  lastStartTime: Date;

  @ManyToOne(() => UsersHabit, (usersHabit) => usersHabit.dailyGoals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'habit_id' })
  usersHabits: UsersHabit;

  @OneToOne(() => UsersPoint, (usersPoint) => usersPoint.dailyGoal, {
    cascade: true,
  })
  usersPoints: UsersPoint[];
}
