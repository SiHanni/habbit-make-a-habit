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

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  createdAt: Date;

  @Column({
    name: 'last_worked',
    type: 'timestamp',
    nullable: true,
    default: null,
    precision: 0,
  })
  lastWorked: Date;

  @Column({ name: 'main_goal' })
  mainGoal: string;

  @Column({ name: 'daily_goal' })
  dailyGoal: string;

  @Column({ name: 'daily_goal_time' }) // 분 단위, 최소 30분 이상
  dailyGoalTime: number;

  @Column({ name: 'goal_days' })
  goalDays: number;

  @Column({ name: 'success_cnt' })
  successCnt: number;

  @Column({ name: 'total_worked_time' })
  totalWorkedTime: number;

  @Column({ name: 'continuous_cnt' })
  continuousCnt: number;

  @Column({ name: 'is_finished', default: false })
  isFinished: boolean;

  @ManyToOne(() => User, (user) => user.usersHabits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => DailyGoalProgress,
    (dailyGoalProgress) => dailyGoalProgress.usershabits,
    {
      cascade: true,
    },
  )
  dailyGoals: DailyGoalProgress[];
}
