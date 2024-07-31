import { Injectable } from '@nestjs/common';
import { CreateUsersInterestDto } from './dto/create-users_interest.dto';
import { UpdateUsersInterestDto } from './dto/update-users_interest.dto';

@Injectable()
export class UsersInterestsService {
  create(createUsersInterestDto: CreateUsersInterestDto) {
    return 'This action adds a new usersInterest';
  }

  findAll() {
    return `This action returns all usersInterests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersInterest`;
  }

  update(id: number, updateUsersInterestDto: UpdateUsersInterestDto) {
    return `This action updates a #${id} usersInterest`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersInterest`;
  }
}
