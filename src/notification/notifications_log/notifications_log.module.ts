import { Module } from '@nestjs/common';
import { NotificationsLogService } from './notifications_log.service';
import { NotificationsLogController } from './notifications_log.controller';

@Module({
  controllers: [NotificationsLogController],
  providers: [NotificationsLogService],
})
export class NotificationsLogModule {}
