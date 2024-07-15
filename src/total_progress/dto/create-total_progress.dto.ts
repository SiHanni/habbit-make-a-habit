import { IsNumber, IsBoolean, IsDate } from 'class-validator';

export class TotalProgressDto {
  habitId: number;
  lastProgress: Date;
  totalSuccessCnt: number;
  continuousCnt: number;
  isComplete: boolean;
  totalProgressTime: number;
}

export class CreateTotalProgressDto {
  @IsNumber()
  habitId: number;

  @IsDate()
  lastProgress: Date;

  @IsNumber()
  totalSuccessCnt: number;

  @IsNumber()
  continuousCnt: number;

  @IsBoolean()
  isComplete: boolean;

  @IsNumber()
  totalProgressTime: number;
}
