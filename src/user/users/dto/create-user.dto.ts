import { IsString, IsEmail, IsBoolean, IsNumber } from 'class-validator';
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
}
