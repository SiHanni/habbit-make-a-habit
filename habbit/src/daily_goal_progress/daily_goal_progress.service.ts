import { Injectable } from '@nestjs/common';
import { CreateDailyGoalProgressDto } from './dto/create-daily_goal_progress.dto';
import { UpdateDailyGoalProgressDto } from './dto/update-daily_goal_progress.dto';

@Injectable()
export class DailyGoalProgressService {
  create(createDailyGoalProgressDto: CreateDailyGoalProgressDto) {
    return 'This action adds a new dailyGoalProgress';
  }

  findAll() {
    return `This action returns all dailyGoalProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyGoalProgress`;
  }

  update(id: number, updateDailyGoalProgressDto: UpdateDailyGoalProgressDto) {
    return `This action updates a #${id} dailyGoalProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyGoalProgress`;
  }
}
