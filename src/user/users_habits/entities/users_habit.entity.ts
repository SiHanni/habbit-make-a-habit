import { DailyGoalProgress } from 'src/daily_goal_progress/entities/daily_goal_progress.entity';
import { User } from 'src/user/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('users_habits')
export class UsersHabit {
  @PrimaryGeneratedColumn({ name: 'id' })
  habitId: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  createdAt: Date;

  @Column({ name: 'main_goal' })
  mainGoal: string;

  @Column({ name: 'daily_goal' })
  dailyGoal: string;

  @Column({ name: 'daily_goal_time' })
  dailyGoalTime: number;

  @Column({ name: 'duration_week' })
  durationWeek: number;

  @Column({ name: 'is_finished', default: false })
  isFinished: boolean;

  @OneToMany(
    () => DailyGoalProgress,
    (dailyGoalProgress) => dailyGoalProgress.dailyGoalProgressId,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  dailyGoalProgress: DailyGoalProgress[];
}
