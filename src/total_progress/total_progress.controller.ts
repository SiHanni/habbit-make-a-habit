import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TotalProgressService } from './total_progress.service';
import { CreateTotalProgressDto } from './dto/create-total_progress.dto';
import { UpdateTotalProgressDto } from './dto/update-total_progress.dto';

@Controller('total-progress')
export class TotalProgressController {
  constructor(private readonly totalProgressService: TotalProgressService) {}

  @Post()
  create(@Body() createTotalProgressDto: CreateTotalProgressDto) {
    return this.totalProgressService.create(createTotalProgressDto);
  }

  @Get()
  findAll() {
    return this.totalProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.totalProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTotalProgressDto: UpdateTotalProgressDto) {
    return this.totalProgressService.update(+id, updateTotalProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.totalProgressService.remove(+id);
  }
}
