import { Module } from '@nestjs/common';
import { UsersInterestsService } from './users_interests.service';
import { UsersInterestsController } from './users_interests.controller';

@Module({
  controllers: [UsersInterestsController],
  providers: [UsersInterestsService],
})
export class UsersInterestsModule {}
