import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { generateJwtToken } from 'src/common/utils/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password } = createUserDto;

    const checkEmail = await this.userRepository.findOne({
      where: { email, isMember: true },
    });
    if (checkEmail) {
      throw new Error('This email is already registerd');
    }

    const checkUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (checkUsername) {
      throw new Error('This username is already used');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const jwtToken = await generateJwtToken({
      email: email,
      username: username,
    } as User);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      isMember: true,
      token: jwtToken,
    });
    return this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  //update(id: number, updateUserDto: UpdateUserDto) {
  //  return `This action updates a #${id} user`;
  //}

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
