import { Test, TestingModule } from '@nestjs/testing';
import { DailyGoalProgressService } from './daily_goal_progress.service';

describe('DailyGoalProgressService', () => {
  let service: DailyGoalProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyGoalProgressService],
    }).compile();

    service = module.get<DailyGoalProgressService>(DailyGoalProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
