import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyGoalProgressModule } from './daily_goal_progress/daily_goal_progress.module';
import { InterestsModule } from './interests/interests.module';
import { NotificationsModule } from './notification/notifications/notifications.module';
import { NotificationsLogModule } from './notification/notifications_log/notifications_log.module';
import { PointsModule } from './points/points.module';
import { TotalProgressModule } from './total_progress/total_progress.module';
import { UsersModule } from './user/users/users.module';
import { UsersHabitsModule } from './user/users_habits/users_habits.module';
import { UsersInterestsModule } from './user/users_interests/users_interests.module';
import { UsersPointsModule } from './user/users_points/users_points.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'habbit',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발 중에는 true로 설정하고, 배포 시에는 false로 설정
      logging: true,
    }),
    DailyGoalProgressModule,
    InterestsModule,
    NotificationsModule,
    NotificationsLogModule,
    PointsModule,
    TotalProgressModule,
    UsersModule,
    UsersHabitsModule,
    UsersInterestsModule,
    UsersPointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
