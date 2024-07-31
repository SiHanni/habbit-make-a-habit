import { Test, TestingModule } from '@nestjs/testing';
import { UsersHabitsService } from './users_habits.service';

describe('UsersHabitsService', () => {
  let service: UsersHabitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersHabitsService],
    }).compile();

    service = module.get<UsersHabitsService>(UsersHabitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
