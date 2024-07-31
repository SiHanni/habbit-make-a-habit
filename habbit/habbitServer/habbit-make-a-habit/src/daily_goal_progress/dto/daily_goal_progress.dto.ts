import { IsNumber } from 'class-validator';
import { HabitDto } from 'src/user/users_habits/dto/users_habit.dto';

export class DailyGoalProgressDto {
  dailyGoalProgressId: number;
  habitId: number;
  createdAt: Date;
  progressTime: number;
  isFinished: boolean;
  confirmedTime: number;
  onProgress: boolean;
}

export class DailyGoalDto extends HabitDto {
  @IsNumber()
  dailyGoalId: number;
}
