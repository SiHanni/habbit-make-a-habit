import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Get,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LogInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.signUp(createUserDto);
      return {
        userId: user.userId,
        email: user.email,
        username: user.username,
        token: user.token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('logIn')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LogInDto) {
    return await this.usersService.logIn(loginDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUser(+id);
  }

  @Put('update/:id')
  async updateProfile(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<{ user: User; msg: string }> {
    return await this.usersService.updateProfile(+id, updateProfileDto);
  }
  // +id는 Number(123) 과 같은 역할을 한다.

  @Delete('delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ msg: string }> {
    return await this.usersService.deleteUser(+id);
  }
  //@Get()
  //findAll() {
  //  return this.usersService.findAll();
  //}
  //
  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //  return this.usersService.findOne(+id);
  //}
  //
  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //  return this.usersService.update(+id, updateUserDto);
  //}
  //
  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.usersService.remove(+id);
  //}
}
