import { Test, TestingModule } from '@nestjs/testing';
import { TotalProgressService } from './total_progress.service';

describe('TotalProgressService', () => {
  let service: TotalProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotalProgressService],
    }).compile();

    service = module.get<TotalProgressService>(TotalProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
