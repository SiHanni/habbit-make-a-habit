import { Module } from '@nestjs/common';
import { DailyGoalProgressService } from './daily_goal_progress.service';
import { DailyGoalProgressController } from './daily_goal_progress.controller';

@Module({
  controllers: [DailyGoalProgressController],
  providers: [DailyGoalProgressService],
})
export class DailyGoalProgressModule {}
