import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import isImageUrl from 'image-url-validator';
import * as bcrypt from 'bcrypt';
import { generateJwtToken } from 'src/common/utils/jwt';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Interest } from 'src/interests/entities/interest.entity';
import { UsersInterest } from '../users_interests/entities/users_interest.entity';

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
        select: ['interestId'],
      });
      const usersInterests = checkInterest.map((interest) =>
        this.usersInterestRepository.create({
          user: savedUser,
          interests: interest,
        }),
      );
      await this.usersInterestRepository.save(usersInterests);
    }
    return savedUser;
  }

  async SignIn(
    signInDto: SignInDto,
  ): Promise<{ userId: number; msg: string; username: string }> {
    const { email, password } = signInDto;

    const userCheck = await this.userRepository.findOne({
      where: { email, isMember: true },
    });
    if (!userCheck) {
      console.log('Invalid email');
      throw new UnauthorizedException('Invalid email');
    }
    const passwordCheck = await bcrypt.compare(password, userCheck.password);
    if (!passwordCheck) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      userId: userCheck.userId,
      msg: 'SignIn successful',
      username: userCheck.username,
    };
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateProfile(
    userId: number,
    editUserDto: UpdateUserDto,
  ): Promise<{ user: User; msg: string }> {
    const { username, profileImg } = editUserDto;

    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (username) {
      const checkUsername = await this.userRepository.findOne({
        where: { username },
      });
      if (checkUsername && checkUsername.userId !== user.userId) {
        throw new BadRequestException('Already used username');
      }
      user.username = username;
    }

    if (profileImg) {
      const isValidImageUrl = await isImageUrl(profileImg);
      if (!isValidImageUrl) {
        throw new BadRequestException('Inavalid image Url');
      }
      user.profileImg = profileImg;
    }
    const updatedUser = await this.userRepository.save(user);
    return { user: updatedUser, msg: 'Success updated user profile' };
  }

  async deleteUser(userId: number): Promise<{ msg: string }> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['usersInterests', 'usersHabits', 'usersPoints'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const id = userId;
    try {
      // 사용자 삭제
      await this.userRepository.remove(user);
    } catch (error) {
      throw new ConflictException('Error deleting user');
      // 삭제 중 오류가 발생할 때 사용하는 예외처리
    }

    return {
      msg: `Delete *User Id : ${id} *Username : ${user.username}`,
    };
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
