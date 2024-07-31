import { Test, TestingModule } from '@nestjs/testing';
import { UsersPointsService } from './users_points.service';

describe('UsersPointsService', () => {
  let service: UsersPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPointsService],
    }).compile();

    service = module.get<UsersPointsService>(UsersPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
