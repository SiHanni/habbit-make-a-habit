import { IsNumber, IsString } from 'class-validator';

export class PointDto {
  pointId: number;
  category: string;
  point: number;
}

export class CreatePointDto {
  @IsString()
  category: string;

  @IsNumber()
  point: number;
}
