import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';
import { UsersInterest } from 'src/user/users_interests/entities/users_interest.entity';

export class UserDto {
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  password: string;
  profileImg: string;
  isMember: boolean;
  usersInterests: UsersInterest[];
}
export class CreateUserDto {
  @IsNumber()
  userId: number;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  profileImg: string;

  @IsBoolean()
  isMember: boolean;

  @IsString()
  token: string;

  @IsArray()
  @ArrayNotEmpty() // 무조건 관심사를 받아야한다면 사용해야할 옵션
  @IsInt({ each: true }) // 배열의 각 요소에 대해 정수인지 검증하는 데코레이터
  interests: string[];
}

export class LogInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
