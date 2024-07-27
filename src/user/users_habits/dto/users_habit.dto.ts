import { IsNumber } from 'class-validator';

export class UsersHabitDto {
  habitId: number;
  userId: number;
  createdAt: Date;
  mainGoal: string;
  dailyGoal: string;
  dailyGoalTime: number;
  isFinished: boolean;
}

export class StartHabitDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  habitId: number;
}

export class StopHabitDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  habitId: number;

  @IsNumber()
  dailyGoalId: number;
}

export class EndHabitDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  habitId: number;
}
