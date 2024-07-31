import { Test, TestingModule } from '@nestjs/testing';
import { UsersInterestsController } from './users_interests.controller';
import { UsersInterestsService } from './users_interests.service';

describe('UsersInterestsController', () => {
  let controller: UsersInterestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersInterestsController],
      providers: [UsersInterestsService],
    }).compile();

    controller = module.get<UsersInterestsController>(UsersInterestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
