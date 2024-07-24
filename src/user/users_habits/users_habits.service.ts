import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import { Repository } from 'typeorm';
import { UsersHabit } from './entities/users_habit.entity';
import { User } from '../users/entities/user.entity';
import { DailyGoalProgress } from 'src/daily_goal_progress/entities/daily_goal_progress.entity';
import { StartHabitDto } from './dto/users_habit.dto';
import { DailyGoalProgressDto } from 'src/daily_goal_progress/dto/create-daily_goal_progress.dto';

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
    @InjectRepository(DailyGoalProgress)
    private readonly dailyGoalRepository: Repository<DailyGoalProgress>,
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

  async startHabit(
    startHabitDto: StartHabitDto,
    dailyGoalProgressDto: DailyGoalProgressDto,
  ): Promise<{ msg: string }> {
    // 1.해당 유저의 habitId에 대한 데이터 검증
    const { userId, habitId } = startHabitDto;

    console.log('u', userId, habitId);
    const checkHabit = await this.usersHabitsRepository.findOne({
      where: { habitId },
      relations: ['user', 'dailyGoals'],
    });
    console.log('checlk', checkHabit);
    if (!checkHabit) {
      throw new Error('Invalid Request : Not Existed habit');
    }
    if (checkHabit.user.userId !== userId) {
      throw new Error('Invalid Request : User dosent match');
    }

    // 2. 해당 habitId로 daily row가 있는지 체크 (없다면 생성)
    const today = new Date();
    console.log('TOPDAU:', today);
    today.setHours(0, 0, 0, 0); // 오늘의 날짜만 비교하기 위해 시간 부분을 제거
    const checkDailyRoutine = await this.dailyGoalRepository
      .createQueryBuilder('daily_goal_progress')
      .where('daily_goal_progress.habit_id = :habitId', { habitId })
      // .andWhere('DATE(daily_goal_progress.created_at) = DATE(:today)', {
      //   today: today.toISOString().split('T')[0],
      // })
      .andWhere('DATE(daily_goal_progress.created_at) = CURDATE()')
      .getOne();

    console.log('checkTOday', checkDailyRoutine);

    if (checkDailyRoutine) {
      if (checkDailyRoutine.isFinished || checkDailyRoutine.onProgress) {
        throw new Error(
          'Invalid Request: Daily goal is either finished or already in progress',
        );
      }
      checkDailyRoutine.onProgress = true;
      await this.dailyGoalRepository.save(checkDailyRoutine);
    } else {
      const newDailyRoutine = this.dailyGoalRepository.create({
        ...dailyGoalProgressDto,
        onProgress: true,
        usershabits: checkHabit,
      });
      await this.dailyGoalRepository.save(newDailyRoutine);
    }
    // 3. daily row에서 is_finished와 on_progress가 false인지 체크(true면 진행 안댐)
    // 4. 시작하면 on_progress true로 바꿔놓으면 됌
    return { msg: 'Habit started successfully' };
  }
}
