import { User } from 'src/user/users/entities/user.entity';
import { Point } from 'src/points/entities/point.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { DailyGoalProgress } from 'src/daily_goal_progress/entities/daily_goal_progress.entity';
import { UsersHabit } from 'src/user/users_habits/entities/users_habit.entity';
@Entity('users_points')
export class UsersPoint {
  @PrimaryGeneratedColumn({ name: 'users_points_id' })
  usersPointsId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.usersPoints, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(
    () => DailyGoalProgress,
    (dailyGoalProgress) => dailyGoalProgress.usersPoints,
    { onDelete: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'daily_goal_id' })
  dailyGoal: DailyGoalProgress;

  @ManyToOne(() => Point, (point) => point.usersPoints, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'point_id' })
  point: Point;

  @ManyToOne(() => UsersHabit, (usersHabit) => usersHabit.usersPoints, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'habit_id' })
  usersHabits: UsersHabit;
}
