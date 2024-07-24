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

  @Column({ name: 'progress_time' })
  progressTime: number;

  @Column({ name: 'is_finished' })
  isFinished: boolean;

  @Column({
    name: 'confirmed_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  confirmedTime: Date;

  @Column({ name: 'on_progress' })
  onProgress: boolean;

  @ManyToOne(() => UsersHabit, (usersHabit) => usersHabit.dailyGoals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'habit_id' })
  usershabits: UsersHabit;

  @OneToOne(() => UsersPoint, (usersPoint) => usersPoint.dailyGoal, {
    cascade: true,
  })
  usersPoints: UsersPoint[];
}
