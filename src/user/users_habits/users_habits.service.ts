import { Injectable } from '@nestjs/common';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import { UpdateUsersHabitDto } from './dto/update-users_habit.dto';

@Injectable()
export class UsersHabitsService {
  create(createUsersHabitDto: CreateUsersHabitDto) {
    return 'This action adds a new usersHabit';
  }

  findAll() {
    return `This action returns all usersHabits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersHabit`;
  }

  update(id: number, updateUsersHabitDto: UpdateUsersHabitDto) {
    return `This action updates a #${id} usersHabit`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersHabit`;
  }
}
