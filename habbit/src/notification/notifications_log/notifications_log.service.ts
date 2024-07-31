import { Injectable } from '@nestjs/common';
import { CreateNotificationsLogDto } from './dto/create-notifications_log.dto';
import { UpdateNotificationsLogDto } from './dto/update-notifications_log.dto';

@Injectable()
export class NotificationsLogService {
  create(createNotificationsLogDto: CreateNotificationsLogDto) {
    return 'This action adds a new notificationsLog';
  }

  findAll() {
    return `This action returns all notificationsLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationsLog`;
  }

  update(id: number, updateNotificationsLogDto: UpdateNotificationsLogDto) {
    return `This action updates a #${id} notificationsLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationsLog`;
  }
}
