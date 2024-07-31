import { Test, TestingModule } from '@nestjs/testing';
import { DailyGoalProgressController } from './daily_goal_progress.controller';
import { DailyGoalProgressService } from './daily_goal_progress.service';

describe('DailyGoalProgressController', () => {
  let controller: DailyGoalProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyGoalProgressController],
      providers: [DailyGoalProgressService],
    }).compile();

    controller = module.get<DailyGoalProgressController>(DailyGoalProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
