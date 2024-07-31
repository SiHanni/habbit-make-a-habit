import { Test, TestingModule } from '@nestjs/testing';
import { UsersPointsController } from './users_points.controller';
import { UsersPointsService } from './users_points.service';

describe('UsersPointsController', () => {
  let controller: UsersPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPointsController],
      providers: [UsersPointsService],
    }).compile();

    controller = module.get<UsersPointsController>(UsersPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
