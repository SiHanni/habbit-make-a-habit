import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import { Repository } from 'typeorm';
import { UsersHabit } from './entities/users_habit.entity';
import { User } from '../users/entities/user.entity';
import { DailyGoalProgress } from 'src/daily_goal_progress/entities/daily_goal_progress.entity';
import {
  StartHabitDto,
  StopHabitDto,
  UsersHabitDto,
} from './dto/users_habit.dto';
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
    const checkDailyRoutine = await this.dailyGoalRepository
      .createQueryBuilder('daily_goal_progress')
      .where('daily_goal_progress.habit_id = :habitId', { habitId })
      .andWhere('DATE(daily_goal_progress.created_at) = CURDATE()')
      .getOne();
    console.log('today', checkDailyRoutine);
    // 3. daily row에서 is_finished와 on_progress가 false인지 체크(true면 진행 안댐)
    // 4. 시작하면 on_progress true로 바꿔놓으면 됌

    if (checkDailyRoutine) {
      if (checkDailyRoutine.isFinished || checkDailyRoutine.onProgress) {
        throw new Error(
          'Invalid Request: Daily goal is either finished or already in progress',
        );
      }
      checkDailyRoutine.onProgress = true;
      const now = new Date();
      checkDailyRoutine.lastStartTime = now;
      await this.dailyGoalRepository.save(checkDailyRoutine);
    } else {
      if (checkHabit.dailyGoals.length > 0) {
        const previousGoalsToUpdate = checkHabit.dailyGoals.filter(
          (goal) => goal.onProgress === true,
        );
        for (const goal of previousGoalsToUpdate) {
          await this.dailyGoalRepository.update(
            { dailyGoalId: goal.dailyGoalId },
            { onProgress: false },
          );
        }
      }

      const newDailyRoutine = this.dailyGoalRepository.create({
        ...dailyGoalProgressDto,
        onProgress: true,
        usersHabits: checkHabit,
      });
      await this.dailyGoalRepository.save(newDailyRoutine);
    }

    return { msg: 'Habit started successfully' };
  }
  // 앱화면에서는 메인화면 블럭을 누르면 그 안에 dailyRoutine들 목록이 있을 것
  // 그 목록들 하나하나 관리할 수 있도록.
  // 그래서 어제꺼 완료 못한건 지금 아래 api와는 상관 없다.
  async stopHabit(
    stopHabitDto: StopHabitDto,
    usersHabitDto: UsersHabitDto,
    dailyGoalProgressDto: DailyGoalProgressDto,
  ): Promise<{ msg: string }> {
    // 진행 중인데 완료 조건 충족되지않았다면 일시 정지
    // 진행 중인데 완료 조건 충족되었다면 완료 처리
    // 완료 처리란? -> dailyProgress(is_finished = true, confirmed_at, on_progress = false) 로 되어야함.
    // 완료 처리란? -> users_habit(is_finished= true)
    // 포인트도 지급해야함.
    // 또한, users_habit(last_worked 업데이트, 이 때 해당 habit goal_days가 끝나는 날인지 체크 필요)
    // 또한, users_habit(success_cnt +1)
    // 또한, users_habit(total_worked_time에 분단위로 +)
    // 또한, users_habit(last_worked가 어제라면, continuous_cnt +1)

    // 근데 유저가 시작만 해두고 종료 api를 호출하지 않으면 어떻게 처리할지 고민해봐야함.
    // 데일리 루틴 완료후 30분이 지났는데도 종료하지 않았다면 푸시 알림을 보내도록 한다.

    // business logic
    // 1. 유저와 습관 검증
    const { userId, habitId, dailyGoalId } = stopHabitDto;

    const checkHabit = await this.dailyGoalRepository
      .createQueryBuilder('daily_goal_progress')
      .leftJoinAndSelect('daily_goal_progress.usersHabits', 'users_habits')
      .leftJoinAndSelect('users_habits.user', 'users')
      .where('daily_goal_progress.dailyGoalId = :dailyGoalId', { dailyGoalId })
      .andWhere('users_habits.habitId = :habitId', { habitId })
      .andWhere('users_habits.user = :userId', { userId })
      .andWhere('daily_goal_progress.onProgress= true')
      .getOne();
    if (!checkHabit) {
      throw new Error('Invalid Request');
    }
    const progressTime = checkHabit.progressTime; // 현재 진행 시간
    console.log('BEFORE PROGRESS TIME', progressTime);
    const now = new Date();
    const lastStartTime = new Date(checkHabit.lastStartTime);
    console.log('lastStartTiem', lastStartTime);
    const timeDiff = now.getTime() - lastStartTime.getTime();
    const elapseToMin = Math.floor(timeDiff / (1000 * 60));
    const updatedProgressTime = progressTime + elapseToMin;
    console.log('AFTER PROGRESSTIME', updatedProgressTime);
    const dailyGoalTime = checkHabit.usersHabits.dailyGoalTime;
    console.log('DAILY GOAL TIME', dailyGoalTime);
    if (updatedProgressTime >= dailyGoalTime) {
      // 완료 프로세스 시작
      // 일단 daily 먼저
      await this.dailyGoalRepository.update(dailyGoalId, {
        onProgress: false,
        isFinished: true,
        progressTime: updatedProgressTime,
        confirmedAt: new Date(),
      });
      // users_habit 부분 종료
      await this.endHabit();
    } else {
      await this.dailyGoalRepository.update(dailyGoalId, {
        onProgress: false,
        isFinished: true,
        progressTime: updatedProgressTime,
        confirmedAt: updatedProgressTime,
      });
      return {
        msg: `userId ${userId}'s habitId ${habitId} update time : ${updatedProgressTime}`,
      };
    }

    console.log('chch', checkHabit);
    return { msg: 'test' };
  }
  // mainGoal의 날짜가 종료되었는지 검증하여 습관 전체 블록을 종료시켜버리는 api임.
  //
  async endHabit() {}
}
