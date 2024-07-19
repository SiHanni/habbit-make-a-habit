import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Interest } from 'src/interests/entities/interest.entity';
import { UsersInterest } from '../users_interests/entities/users_interest.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Interest, UsersInterest])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
