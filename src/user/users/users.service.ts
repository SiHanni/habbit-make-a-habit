import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository, In } from 'typeorm';
//import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersInterest } from '../users_interests/entities/users_interest.entity';
import { Interest } from 'src/interests/entities/interest.entity';
import { generateJwtToken } from 'src/common/utils/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UsersInterest)
    private readonly usersInterestRepository: Repository<UsersInterest>,
    @InjectRepository(Interest)
    private readonly interestRepository: Repository<Interest>,
    // interestRepository를 user.service에서 사용하려면 usersModule에서 종속성을 주입시켜 주어야한다.
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password, interests } = createUserDto;

    const checkEmail = await this.userRepository.findOne({
      where: { email, isMember: true },
    });
    if (checkEmail) {
      throw new Error('This email is already registerd');
    }

    const checkUsername = await this.userRepository.findOne({
      where: { username, isMember: true },
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
    const savedUser = await this.userRepository.save(newUser);
    if (interests) {
      const checkInterest = await this.interestRepository.find({
        where: {
          category: In(interests),
        },
        select: ['interestsId'],
      });
      const usersInterests = checkInterest.map((interest) =>
        this.usersInterestRepository.create({
          userId: savedUser,
          interestsId: interest,
        }),
      );
      await this.usersInterestRepository.save(usersInterests);
    }
    return savedUser;
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
