import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersHabitsService } from './users_habits.service';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';

@Controller('users-habits')
export class UsersHabitsController {
  constructor(private readonly usersHabitsService: UsersHabitsService) {}

  @Post('generateHabit')
  async generateHabit(@Body() createUsersHabitDto: CreateUsersHabitDto) {
    try {
      const habit =
        await this.usersHabitsService.generateHabit(createUsersHabitDto);

      return {
        userId: habit.usersHabit.user.userId,
        habitId: habit.usersHabit.habitId,
        mainGoal: habit.usersHabit.mainGoal,
        goalDays: habit.usersHabit.goalDays,
        dailyGoal: habit.usersHabit.dailyGoal,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
