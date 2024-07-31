import { IsNumber } from 'class-validator';

export class UsersInterestDto {
  id: number;
  userId: number;
  interestId: number;
}

export class CreateUsersInterestDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  interestId: number;
}
