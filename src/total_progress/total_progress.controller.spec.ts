import { Test, TestingModule } from '@nestjs/testing';
import { TotalProgressController } from './total_progress.controller';
import { TotalProgressService } from './total_progress.service';

describe('TotalProgressController', () => {
  let controller: TotalProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotalProgressController],
      providers: [TotalProgressService],
    }).compile();

    controller = module.get<TotalProgressController>(TotalProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
