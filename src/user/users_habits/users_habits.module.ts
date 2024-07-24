import { Module } from '@nestjs/common';
import { UsersHabitsService } from './users_habits.service';
import { UsersHabitsController } from './users_habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersHabit } from './entities/users_habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersHabit])],
  controllers: [UsersHabitsController],
  providers: [UsersHabitsService],
})
export class UsersHabitsModule {}
