import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import { Repository } from 'typeorm';
import { UsersHabit } from './entities/users_habit.entity';
import { User } from '../users/entities/user.entity';

// 1. 습관 생성 api (습관 생성)
// 2. 습관 시작 api (명세와 동일)
// 3. 습관 종료 api (명세와 동일)
// 4. 습관 조회 api (명세와 동일 )
@Injectable()
export class UsersHabitsService {
  constructor(
    @InjectRepository(UsersHabit)
    private readonly usersHabitsRepository: Repository<UsersHabit>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async generateHabit(
    createUsersHabitDto: CreateUsersHabitDto,
  ): Promise<{ usersHabit: UsersHabit; msg: string }> {
    const { userId, mainGoal } = createUsersHabitDto;

    // 1. userID 체크 // 추후에는 로그인되어진 상태인지도 받아서 체크해야함.
    const checkUser = await this.usersRepository.findOne({
      where: { userId },
    });
    if (!checkUser) {
      throw new NotFoundException('User not found');
    }
    // 2. 해당 유저가 완전히 똑같은 이름의 메인골이 있는지만 체크하고 없다면 저장하고 일단 끝내기.
    const habitCheck = await this.usersHabitsRepository.findOne({
      where: { user: { userId: userId }, mainGoal },
      relations: ['user'],
    });
    if (habitCheck && habitCheck.isExpired === false) {
      throw new Error('Same Goal is working on it');
    }

    const newHabit = this.usersHabitsRepository.create(createUsersHabitDto);
    return {
      usersHabit: await this.usersHabitsRepository.save(newHabit),
      msg: 'success generate new habit',
    };
  }
}
