import { Injectable } from '@nestjs/common';
import { CreateUsersPointDto } from './dto/create-users_point.dto';
import { UpdateUsersPointDto } from './dto/update-users_point.dto';

@Injectable()
export class UsersPointsService {
  create(createUsersPointDto: CreateUsersPointDto) {
    return 'This action adds a new usersPoint';
  }

  findAll() {
    return `This action returns all usersPoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersPoint`;
  }

  update(id: number, updateUsersPointDto: UpdateUsersPointDto) {
    return `This action updates a #${id} usersPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersPoint`;
  }
}
