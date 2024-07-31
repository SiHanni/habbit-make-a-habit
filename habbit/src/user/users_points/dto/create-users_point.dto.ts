import { IsNumber } from 'class-validator';

export class UsersPointDto {
  usersPointsId: number;
  userId: number;
  usersHabitId: number;
  pointId: number;
  createdAt: Date;
}

export class CreateUsersPointDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  usersHabitId: number;

  @IsNumber()
  pointId: number;
}
