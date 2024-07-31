import { Module } from '@nestjs/common';
import { UsersPointsService } from './users_points.service';
import { UsersPointsController } from './users_points.controller';

@Module({
  controllers: [UsersPointsController],
  providers: [UsersPointsService],
})
export class UsersPointsModule {}
