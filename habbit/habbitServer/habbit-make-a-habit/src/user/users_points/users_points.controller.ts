import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersPointsService } from './users_points.service';
import { CreateUsersPointDto } from './dto/create-users_point.dto';
import { UpdateUsersPointDto } from './dto/update-users_point.dto';

@Controller('users-points')
export class UsersPointsController {
  constructor(private readonly usersPointsService: UsersPointsService) {}

  @Post()
  create(@Body() createUsersPointDto: CreateUsersPointDto) {
    return this.usersPointsService.create(createUsersPointDto);
  }

  @Get()
  findAll() {
    return this.usersPointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersPointsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersPointDto: UpdateUsersPointDto) {
    return this.usersPointsService.update(+id, updateUsersPointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersPointsService.remove(+id);
  }
}
