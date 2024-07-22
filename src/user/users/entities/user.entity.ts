import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UsersInterest } from 'src/user/users_interests/entities/users_interest.entity';
import { UsersHabit } from 'src/user/users_habits/entities/users_habit.entity';
import { UsersPoint } from 'src/user/users_points/entities/users_point.entity';

@Entity('users') //데이터베이스에서 매핑되는 테이블 명
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  userId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    default: null,
    precision: 0,
  })
  updatedAt: Date;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'profile_img', nullable: true })
  profileImg: string;

  @Column()
  token: string;

  @Column({ name: 'is_member', default: false })
  isMember: boolean;

  @OneToMany(() => UsersInterest, (usersInterest) => usersInterest.user, {
    cascade: true,
  })
  usersInterests: UsersInterest[];

  @OneToMany(() => UsersHabit, (usersHabit) => usersHabit.user, {
    cascade: true,
  })
  usersHabits: UsersHabit[];

  @OneToMany(() => UsersPoint, (usersPoint) => usersPoint.user, {
    cascade: true,
  })
  usersPoints: UsersPoint[];
}
