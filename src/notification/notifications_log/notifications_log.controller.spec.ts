import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsLogController } from './notifications_log.controller';
import { NotificationsLogService } from './notifications_log.service';

describe('NotificationsLogController', () => {
  let controller: NotificationsLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsLogController],
      providers: [NotificationsLogService],
    }).compile();

    controller = module.get<NotificationsLogController>(NotificationsLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
