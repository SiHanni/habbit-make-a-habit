import { Test, TestingModule } from '@nestjs/testing';
import { UsersInterestsService } from './users_interests.service';

describe('UsersInterestsService', () => {
  let service: UsersInterestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersInterestsService],
    }).compile();

    service = module.get<UsersInterestsService>(UsersInterestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
