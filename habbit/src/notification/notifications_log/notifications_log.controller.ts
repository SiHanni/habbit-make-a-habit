import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsLogService } from './notifications_log.service';
import { CreateNotificationsLogDto } from './dto/create-notifications_log.dto';
import { UpdateNotificationsLogDto } from './dto/update-notifications_log.dto';

@Controller('notifications-log')
export class NotificationsLogController {
  constructor(private readonly notificationsLogService: NotificationsLogService) {}

  @Post()
  create(@Body() createNotificationsLogDto: CreateNotificationsLogDto) {
    return this.notificationsLogService.create(createNotificationsLogDto);
  }

  @Get()
  findAll() {
    return this.notificationsLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationsLogDto: UpdateNotificationsLogDto) {
    return this.notificationsLogService.update(+id, updateNotificationsLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsLogService.remove(+id);
  }
}
