import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LogInDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  async sugnUp(@Body() createUserDto: CreateUserDto) {
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
    return this.usersService.logIn(loginDto);
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
