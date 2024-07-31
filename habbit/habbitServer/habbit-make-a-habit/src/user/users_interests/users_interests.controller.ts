import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersInterestsService } from './users_interests.service';
import { CreateUsersInterestDto } from './dto/create-users_interest.dto';
import { UpdateUsersInterestDto } from './dto/update-users_interest.dto';

@Controller('users-interests')
export class UsersInterestsController {
  constructor(private readonly usersInterestsService: UsersInterestsService) {}

  @Post()
  create(@Body() createUsersInterestDto: CreateUsersInterestDto) {
    return this.usersInterestsService.create(createUsersInterestDto);
  }

  @Get()
  findAll() {
    return this.usersInterestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersInterestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersInterestDto: UpdateUsersInterestDto) {
    return this.usersInterestsService.update(+id, updateUsersInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersInterestsService.remove(+id);
  }
}
