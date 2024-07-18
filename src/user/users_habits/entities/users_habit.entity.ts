import { User } from 'src/user/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users_habits')
export class UsersHabit {
  @PrimaryGeneratedColumn({ name: 'id' })
  habitId: number;

  // 제대로 정의된건지 테스트 필요.
  @ManyToOne(() => User, (user) => user.userId)
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
}
