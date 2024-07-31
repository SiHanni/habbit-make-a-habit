import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsLogService } from './notifications_log.service';

describe('NotificationsLogService', () => {
  let service: NotificationsLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsLogService],
    }).compile();

    service = module.get<NotificationsLogService>(NotificationsLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
