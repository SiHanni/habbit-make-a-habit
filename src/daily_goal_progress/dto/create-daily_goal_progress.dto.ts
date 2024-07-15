import { IsNumber, IsBoolean, IsDate } from 'class-validator';

export class DailyGoalProgressDto {
  dailyGoalProgressId: number;
  habitId: number;
  createdAt: Date;
  progressTime: number;
  isFinished: boolean;
  confirmedTime: number;
  onProgress: boolean;
}

export class CreateDailyGoalProgressDto {
  @IsNumber()
  habitId: number;

  @IsDate()
  createdAt: Date;

  @IsNumber()
  progressTime: number;

  @IsBoolean()
  isFinished: boolean;

  @IsNumber()
  confirmedTime: number;

  @IsBoolean()
  onProgress: boolean;
}
