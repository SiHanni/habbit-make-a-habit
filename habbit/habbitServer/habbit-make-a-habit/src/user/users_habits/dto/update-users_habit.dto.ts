import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersHabitDto } from './create-users_habit.dto';

export class UpdateUsersHabitDto extends PartialType(CreateUsersHabitDto) {}
