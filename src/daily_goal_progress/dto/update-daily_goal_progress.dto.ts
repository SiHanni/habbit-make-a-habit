import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyGoalProgressDto } from './create-daily_goal_progress.dto';

export class UpdateDailyGoalProgressDto extends PartialType(
  CreateDailyGoalProgressDto,
) {}
