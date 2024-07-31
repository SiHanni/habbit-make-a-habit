import { Module } from '@nestjs/common';
import { UsersHabitsService } from './users_habits.service';
import { UsersHabitsController } from './users_habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersHabit } from './entities/users_habit.entity';
import { DailyGoalProgress } from 'src/daily_goal_progress/entities/daily_goal_progress.entity';
import { Point } from 'src/points/entities/point.entity';
import { UsersPoint } from '../users_points/entities/users_point.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UsersHabit,
      DailyGoalProgress,
      Point,
      UsersPoint,
    ]),
  ],
  controllers: [UsersHabitsController],
  providers: [UsersHabitsService],
})
export class UsersHabitsModule {}
