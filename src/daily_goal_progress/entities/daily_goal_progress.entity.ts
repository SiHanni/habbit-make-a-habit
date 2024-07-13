import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersHabit } from 'src/user/users_habits/entities/users_habit.entity';
@Entity('daily_goal_progress')
export class DailyGoalProgress {
  @PrimaryGeneratedColumn({ name: 'id' })
  dailyGoalProgressId: number;

  @ManyToOne(() => UsersHabit, (usersHabit) => usersHabit.habitId)
  @JoinColumn({ name: 'habit_id' })
  habitId: UsersHabit;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'progress_time' })
  progressTime: number;

  @Column({ name: 'is_finished' })
  isFinished: boolean;

  @Column({ name: 'confirmed_time' })
  confirmedTime: number;

  @Column({ name: 'on_progress' })
  onProgress: boolean;
}
