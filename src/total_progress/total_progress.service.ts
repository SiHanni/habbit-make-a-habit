import { Injectable } from '@nestjs/common';
import { CreateTotalProgressDto } from './dto/create-total_progress.dto';
import { UpdateTotalProgressDto } from './dto/update-total_progress.dto';

@Injectable()
export class TotalProgressService {
  create(createTotalProgressDto: CreateTotalProgressDto) {
    return 'This action adds a new totalProgress';
  }

  findAll() {
    return `This action returns all totalProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} totalProgress`;
  }

  update(id: number, updateTotalProgressDto: UpdateTotalProgressDto) {
    return `This action updates a #${id} totalProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} totalProgress`;
  }
}
