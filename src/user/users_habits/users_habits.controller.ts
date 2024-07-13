import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersHabitsService } from './users_habits.service';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import { UpdateUsersHabitDto } from './dto/update-users_habit.dto';

@Controller('users-habits')
export class UsersHabitsController {
  constructor(private readonly usersHabitsService: UsersHabitsService) {}

  @Post()
  create(@Body() createUsersHabitDto: CreateUsersHabitDto) {
    return this.usersHabitsService.create(createUsersHabitDto);
  }

  @Get()
  findAll() {
    return this.usersHabitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersHabitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersHabitDto: UpdateUsersHabitDto) {
    return this.usersHabitsService.update(+id, updateUsersHabitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersHabitsService.remove(+id);
  }
}
