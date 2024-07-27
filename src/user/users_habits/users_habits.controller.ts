import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersHabitsService } from './users_habits.service';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import {
  StartHabitDto,
  StopHabitDto,
  EndHabitDto,
} from './dto/users_habit.dto';
import { DailyGoalProgressDto } from 'src/daily_goal_progress/dto/create-daily_goal_progress.dto';

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

  @Post('startHabit')
  async startHabit(
    @Body() startHabitDto: StartHabitDto,
    dailyGoalProgressDto: DailyGoalProgressDto,
  ) {
    try {
      const startHabit = await this.usersHabitsService.startHabit(
        startHabitDto,
        dailyGoalProgressDto,
      );
      return startHabit;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('stopHabit')
  async stopHabit(@Body() stopHabitDto: StopHabitDto) {
    try {
      const stopHabit = await this.usersHabitsService.stopHabit(stopHabitDto);
      return stopHabit;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('endHabit')
  async endHabit(@Body() endHabitDto: EndHabitDto) {
    try {
      const endHabit = await this.usersHabitsService.endHabit(endHabitDto);
      return endHabit;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
