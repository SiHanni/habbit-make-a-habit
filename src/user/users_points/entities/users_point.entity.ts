import { User } from 'src/user/users/entities/user.entity';
import { UsersHabit } from 'src/user/users_habits/entities/users_habit.entity';
import { Point } from 'src/points/entities/point.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity('users_points')
export class UsersPoint {
  @PrimaryGeneratedColumn({ name: 'id' })
  usersPointsId: number;
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'id' })
  user: User;

  @ManyToOne(() => UsersHabit, (usersHabit) => usersHabit.habitId)
  @JoinColumn({ name: 'id' })
  usersHabit: UsersHabit;

  @ManyToOne(() => Point, (point) => point.pointId)
  @JoinColumn({ name: 'id' })
  point: Point;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
