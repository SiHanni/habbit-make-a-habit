import { Test, TestingModule } from '@nestjs/testing';
import { UsersHabitsController } from './users_habits.controller';
import { UsersHabitsService } from './users_habits.service';

describe('UsersHabitsController', () => {
  let controller: UsersHabitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersHabitsController],
      providers: [UsersHabitsService],
    }).compile();

    controller = module.get<UsersHabitsController>(UsersHabitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
