import { IsString } from 'class-validator';

export class InterestDto {
  interestsId: number;
  category: string;
}

export class CreateInterestDto {
  @IsString()
  category: string;
}
