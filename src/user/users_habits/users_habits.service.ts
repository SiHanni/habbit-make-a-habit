import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitDto } from './dto/users_habit.dto';
import { CreateUsersHabitDto } from './dto/create-users_habit.dto';
import { DailyGoalDto } from 'src/daily_goal_progress/dto/daily_goal_progress.dto';
import { User } from '../users/entities/user.entity';
import { UsersHabit } from './entities/users_habit.entity';
import { DailyGoalProgress } from 'src/daily_goal_progress/entities/daily_goal_progress.entity';
import { UsersPoint } from '../users_points/entities/users_point.entity';
// 1. 습관 생성 api (습관 생성)
// 2. 습관 시작 api (명세와 동일)
// 3. 습관 종료 api (명세와 동일)
// 4. 습관 조회 api (명세와 동일 )
@Injectable()
export class UsersHabitsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UsersHabit)
    private readonly usersHabitsRepository: Repository<UsersHabit>,
    @InjectRepository(UsersPoint)
    private readonly usersPointRepository: Repository<UsersPoint>,
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
    if (habitCheck && habitCheck.isFinished === false) {
      throw new Error('Same Goal is working on it');
    }

    const newHabit = this.usersHabitsRepository.create(createUsersHabitDto);
    return {
      usersHabit: await this.usersHabitsRepository.save(newHabit),
      msg: 'success generate new habit',
    };
  }

  async startHabit(
    habitDto: HabitDto,
    dailyGoalDto: DailyGoalDto,
  ): Promise<{ msg: string }> {
    const { userId, habitId } = habitDto;

    const checkHabit = await this.usersHabitsRepository.findOne({
      where: { habitId },
      relations: ['user', 'dailyGoals'],
    });

    if (!checkHabit) {
      throw new NotFoundException('Invalid Request : Not Existed habit');
    }
    if (checkHabit.user.userId !== userId) {
      throw new NotFoundException('Invalid Request : User dosent match');
    }

    // 2. 해당 habitId로 daily row가 있는지 체크 (없다면 생성)
    const checkDailyRoutine = await this.dailyGoalRepository
      .createQueryBuilder('daily_goal_progress')
      .where('daily_goal_progress.habit_id = :habitId', { habitId })
      .andWhere('DATE(daily_goal_progress.created_at) = CURDATE()')
      .getOne();

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
        ...dailyGoalDto,
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
  async stopHabit(dailyProgressDto: DailyGoalDto): Promise<{ msg: string }> {
    // 근데 유저가 시작만 해두고 종료 api를 호출하지 않으면 어떻게 처리할지 고민해봐야함.
    // 데일리 루틴 완료후 30분이 지났는데도 종료하지 않았다면 푸시 알림을 보내도록 한다.

    // business logic
    // 1. 유저와 습관 검증
    const { userId, habitId, dailyGoalId } = dailyProgressDto;

    const checkHabit = await this.dailyGoalRepository
      .createQueryBuilder('daily_goal_progress')
      .leftJoinAndSelect('daily_goal_progress.usersHabits', 'users_habits')
      .leftJoinAndSelect('users_habits.user', 'users')
      .where('daily_goal_progress.dailyGoalId = :dailyGoalId', { dailyGoalId })
      .andWhere('users_habits.habitId = :habitId', { habitId })
      .andWhere('users_habits.user = :userId', { userId })
      .andWhere('daily_goal_progress.onProgress= true')
      .andWhere('DATE(daily_goal_progress.created_at) = CURDATE()')
      .getOne();

    if (!checkHabit) {
      throw new Error('Invalid Request: No routine on progress in today');
    }
    const progressTime = checkHabit.progressTime;
    const now = new Date();
    const lastStartTime = checkHabit.lastStartTime;
    const timeDiff = now.getTime() - lastStartTime.getTime();
    const elapseToMin = Math.floor(timeDiff / (1000 * 60));
    const updatedProgressTime = progressTime + elapseToMin;

    const dailyGoalTime = checkHabit.usersHabits.dailyGoalTime;

    if (updatedProgressTime >= dailyGoalTime) {
      await this.dailyGoalRepository.update(dailyGoalId, {
        onProgress: false,
        isFinished: true,
        progressTime: updatedProgressTime,
        confirmedAt: new Date(),
      });
      // TODO: 성공한 후 데일리 성공 포인트를 지급해야한다.
      try {
        const dailyPoint = await this.usersPointRepository.create({
          user: { userId: userId },
          point: { pointId: 1 },
          usersHabits: { habitId: habitId },
          dailyGoal: { dailyGoalId: dailyGoalId },
        });
        await this.usersPointRepository.save(dailyPoint);
      } catch (error) {
        console.log('error occured in point process', error);
      }

      const checkYesterday = await this.dailyGoalRepository
        .createQueryBuilder('daily_goal_progress')
        .where('daily_goal_progress.habit_id = :habitId', {
          habitId,
        })
        .andWhere(
          'DATE(daily_goal_progress.created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)',
        )
        .andWhere('daily_goal_progress.is_finished = :isFinished', {
          isFinished: true,
        })
        .getOne();
      if (checkYesterday) {
        await this.usersHabitsRepository.update(habitId, {
          lastWorked: new Date(),
          successCnt: checkHabit.usersHabits.successCnt + 1,
          continuousCnt: checkHabit.usersHabits.continuousCnt + 1,
          totalWorkedTime:
            checkHabit.usersHabits.totalWorkedTime + updatedProgressTime,
        });
      } else {
        await this.usersHabitsRepository.update(habitId, {
          lastWorked: new Date(),
          successCnt: checkHabit.usersHabits.successCnt + 1,
          continuousCnt: 0,
          totalWorkedTime:
            checkHabit.usersHabits.totalWorkedTime + updatedProgressTime,
        });
      }
      return {
        msg: `Routine Success :: userId ${userId}'s progressId ${dailyGoalId} update time : ${updatedProgressTime}`,
      };
    } else {
      await this.dailyGoalRepository.update(dailyGoalId, {
        onProgress: false,
        isFinished: true,
        progressTime: updatedProgressTime,
      });
      await this.usersHabitsRepository.update(habitId, {
        lastWorked: new Date(),
        totalWorkedTime:
          checkHabit.usersHabits.totalWorkedTime + updatedProgressTime,
      });
      return {
        msg: `Routine Pause :: userId ${userId}'s progressId ${dailyGoalId} update time : ${updatedProgressTime}`,
      };
    }
  }
  // mainGoal의 날짜가 종료되었는지 검증하여 습관 전체 블록을 종료시켜버리는 api임.
  //
  async endHabit(habitDto: HabitDto) {
    const { userId, habitId } = habitDto;
    const habit = await this.usersHabitsRepository.findOne({
      where: { habitId, user: { userId: userId } },
      relations: ['dailyGoals'],
    });
    const today = new Date();

    const mainGoalDayToMilliSeconds = habit.goalDays * 24 * 60 * 60 * 1000;
    const routineFirstDay = habit.dailyGoals[0].createdAt;
    const habitFinDay = new Date(
      routineFirstDay.getTime() + mainGoalDayToMilliSeconds,
    );
    const FinDay = new Date(habitFinDay.toISOString());
    if (today >= FinDay) {
      const goalDays = habit.goalDays;
      const successCnt = habit.successCnt;
      const successPercentage = Math.round((successCnt / goalDays) * 100);
      if (successPercentage >= 80) {
        await this.usersHabitsRepository.update(habitId, {
          isFinished: true,
          isComplete: true,
        });
        // 성공시 추가 포인트 지급
        try {
          const dailyPoint = await this.usersPointRepository.create({
            user: { userId: userId },
            point: { pointId: 2 },
            usersHabits: { habitId: habitId },
          });
          await this.usersPointRepository.save(dailyPoint);
        } catch (error) {
          console.log('error occured in point process', error);
        }
      } else {
        await this.usersHabitsRepository.update(habitId, {
          isFinished: true,
          isFailed: true,
        });
      }
      return {
        msg: `users habit finished successfully ::: success percentage :: ${successPercentage}`,
      };
    } else {
      throw new Error(`Can't end this habit:: End date is ${FinDay}`);
    }
    // 메인 goal 종료하는 api이다.
    // stopHabit에서도 호출이 된다.
    // 일반적으로도 호출이 되어야 한다.
    // 1. 일반적인 기능
    // 2. users_habits 테이블의 컬럼 값 업데이트
    //  a. is_finished
    //  b. last_worked(이거 목적이 뭐더라)
    //  c. success_cnt
    //  d. total_worked_time
    //  e. continuous_cnt
    //  f. is_expired
    // ** daily최초 시작날, maingoal 날짜 더해서 종료일을 변수에 담고 이게 아직 안됐으면 바로 invalid Request임 이게 시작임
    // 암튼 stopHabit에서 users_habits last_work, success_cnt, totalWorkedTime, continous는 update 해준 상태임.
    // 총 성공 수행일이 목표일의 2/3이상이라면 is_finished 처리, 그렇지 않다면 is_expired 처리
    // is_finished라면 추가보상.
    return { msg: `Can't end this habit:: End date is ${FinDay}` };
  }
  async getAllHabitInfo(habitDto: HabitDto) {
    const { userId } = habitDto;
    const habit = await this.usersHabitsRepository.findOne({
      where: { user: { userId: userId } },
      relations: ['dailyGoals'],
    });
    return habit;
  }
  async getHabitInfo(habitDto: HabitDto) {
    const { userId, habitId } = habitDto;
    const allHabit = await this.usersHabitsRepository.findOne({
      where: { habitId, user: { userId: userId } },
      relations: ['dailyGoals'],
    });
    return allHabit;
  }
}
