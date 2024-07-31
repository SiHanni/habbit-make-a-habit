import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationsLogDto } from './create-notifications_log.dto';

export class UpdateNotificationsLogDto extends PartialType(CreateNotificationsLogDto) {}
