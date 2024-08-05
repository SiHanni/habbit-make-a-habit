import { IsString, IsNumber } from 'class-validator';

export class UsersHabitDto {
  habitId: number;
  user: number;
  createdAt: Date;
  mainGoal: string;
  dailyGoal: string;
  dailyGoalTime: number;
  isFinished: boolean;
}

export class CreateUsersHabitDto {
  @IsNumber()
  userId: number;

  @IsString()
  mainGoal: string;

  @IsNumber()
  goalDays: number;

  @IsString()
  dailyGoal: string;

  @IsNumber()
  dailyGoalTime: number;
}
