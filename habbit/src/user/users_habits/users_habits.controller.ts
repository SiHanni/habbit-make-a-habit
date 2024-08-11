import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersHabitsService } from './users_habits.service';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import { HabitDto } from './dto/users_habit.dto';
import { DailyGoalDto } from 'src/daily_goal_progress/dto/daily_goal_progress.dto';
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
  async startHabit(@Body() habitDto: HabitDto, dailyGoalDto: DailyGoalDto) {
    try {
      const startHabit = await this.usersHabitsService.startHabit(
        habitDto,
        dailyGoalDto,
      );
      return startHabit;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('stopHabit')
  async stopHabit(@Body() dailyGoalDto: DailyGoalDto) {
    try {
      const stopHabit = await this.usersHabitsService.stopHabit(dailyGoalDto);
      return stopHabit;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('endHabit')
  async endHabit(@Body() habitDto: HabitDto) {
    try {
      const endHabit = await this.usersHabitsService.endHabit(habitDto);
      return endHabit;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getAllHabitInfo')
  async getAllHabitInfo(@Query() habitDto: HabitDto) {
    try {
      const getAllHabitInfo =
        await this.usersHabitsService.getAllHabitInfo(habitDto);
      return getAllHabitInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('getHabitInfo')
  async getHabitInfo(@Query() habitDto: HabitDto) {
    try {
      const getHabitInfo = await this.usersHabitsService.getHabitInfo(habitDto);
      return getHabitInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete('removeHabit')
  async removeHabit(@Body() habitDto: HabitDto) {
    try {
      await this.usersHabitsService.removeHabit(habitDto);
      return { message: 'Habit deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
