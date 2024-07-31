import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyGoalProgressService } from './daily_goal_progress.service';
import { CreateDailyGoalProgressDto } from './dto/create-daily_goal_progress.dto';
import { UpdateDailyGoalProgressDto } from './dto/update-daily_goal_progress.dto';

@Controller('daily-goal-progress')
export class DailyGoalProgressController {
  constructor(private readonly dailyGoalProgressService: DailyGoalProgressService) {}

  @Post()
  create(@Body() createDailyGoalProgressDto: CreateDailyGoalProgressDto) {
    return this.dailyGoalProgressService.create(createDailyGoalProgressDto);
  }

  @Get()
  findAll() {
    return this.dailyGoalProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyGoalProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyGoalProgressDto: UpdateDailyGoalProgressDto) {
    return this.dailyGoalProgressService.update(+id, updateDailyGoalProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyGoalProgressService.remove(+id);
  }
}
