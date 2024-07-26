import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import { Repository } from 'typeorm';
import { UsersHabit } from './entities/users_habit.entity';
import { User } from '../users/entities/user.entity';
import { DailyGoalProgress } from 'src/daily_goal_progress/entities/daily_goal_progress.entity';
import { StartHabitDto, StopHabitDto } from './dto/users_habit.dto';
import { DailyGoalProgressDto } from 'src/daily_goal_progress/dto/create-daily_goal_progress.dto';
import { UsersHabitDto } from './dto/users_habit.dto';

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
      const newDailyRoutine = this.dailyGoalRepository.create({
        ...dailyGoalProgressDto,
        onProgress: true,
        usersHabits: checkHabit,
      });
      await this.dailyGoalRepository.save(newDailyRoutine);
    }

    return { msg: 'Habit started successfully' };
  }

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
      .getOne();
    console.log('check', checkHabit);
    const userIdFromQuery = checkHabit.usersHabits.user.userId;
    const habitIdFromQuery = checkHabit.usersHabits.habitId;
    const dailyGoalTime = checkHabit.usersHabits.dailyGoalTime;
    const onProgress = checkHabit.onProgress;

    const todayProgressTime = checkHabit.progressTime;
    const totalProgressTime = checkHabit.usersHabits.totalWorkedTime;
    console.log('A Today time', todayProgressTime);
    const now = new Date();
    const lastStartTime = new Date(checkHabit.lastStartTime);
    console.log('lastStartTiem', lastStartTime);
    const timeDiff = now.getTime() - lastStartTime.getTime();
    const elapseToMin = Math.floor(timeDiff / (1000 * 60));

    const updatedTodayProgressTime = todayProgressTime + elapseToMin;

    console.log('F Today time', updatedTodayProgressTime);

    console.log('ELAPSE MIN :', elapseToMin);

    if (userIdFromQuery !== userId || habitIdFromQuery !== habitId) {
      throw new Error('Invalid Request');
    }
    if (!onProgress) {
      throw new Error('Invalid Request: no started daily habit');
    }
    // 일단 저장된 진행 시간과, 호출한 시점에서 최근시작시간을 뺀 시간을 합친게, 목표 시간보다 크거나 같다면 정지와 동시에 완료 처리
    if (updatedTodayProgressTime >= dailyGoalTime) {
      // 일일 루틴 정지 프로세스 시작
      // 아직 전체 습관 종료 날짜 아니면 daily만 종료하고 각 테이블 값 업데이트 해주기
      // 포인트 지급하기.
    } else {
      // 아직 완료되지 않은 일일 루틴에 대한 처리.
      // 시간 업데이트 등등.
    }
    // 완료 처리에도 만약 오늘 날짜가 해당 습관의 마지막 관리일이라면 isFinished=true
    // 그게 아니라면 진행 시간에 더하기만 해주고 리턴하면서 api 종료

    console.log('chch', checkHabit);
    return { msg: 'test' };
  }
}
