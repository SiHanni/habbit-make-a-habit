import { Module } from '@nestjs/common';
import { UsersHabitsService } from './users_habits.service';
import { UsersHabitsController } from './users_habits.controller';

@Module({
  controllers: [UsersHabitsController],
  providers: [UsersHabitsService],
})
export class UsersHabitsModule {}
