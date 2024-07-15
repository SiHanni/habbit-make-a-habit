import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UsersHabitDto {
  habitId: number;
  userId: number;
  createdAt: Date;
  mainGoal: string;
  dailyGoal: string;
  dailyGoalTime: number;
  durationWeek: number;
  isFinished: boolean;
}

export class CreateUsersHabitDto {
  @IsNumber()
  userId: number;

  @IsString()
  mainGoal: string;

  @IsString()
  dailyGoal: string;

  @IsNumber()
  dailyGoalTime: number;

  @IsNumber()
  durationWeek: number;

  @IsBoolean()
  isFinished: boolean;
}
