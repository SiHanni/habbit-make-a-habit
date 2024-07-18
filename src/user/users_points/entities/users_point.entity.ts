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
@Entity('users_points')
export class UsersPoint {
  @PrimaryGeneratedColumn({ name: 'id' })
  usersPointsId: number;
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @OneToOne(
    () => DailyGoalProgress,
    (dailyGoalProgress) => dailyGoalProgress.dailyGoalProgressId,
  )
  @JoinColumn({ name: 'daily_goal_id' })
  dailyGoalId: DailyGoalProgress;

  @ManyToOne(() => Point, (point) => point.pointId)
  @JoinColumn({ name: 'point_id' })
  pointId: Point;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
