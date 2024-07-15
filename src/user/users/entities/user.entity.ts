import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UsersInterest } from 'src/user/users_interests/entities/users_interest.entity';

@Entity('users') //데이터베이스에서 매핑되는 테이블 명
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'profile_img' })
  profileImg: string;

  //@ManyToMany(() => Interest, { cascade: true })
  //@JoinTable({
  //  name: 'users_interests',
  //  joinColumn: { name: 'user_id', referencedColumnName: 'userId' },
  //  inverseJoinColumn: {
  //    name: 'interests_id',
  //    referencedColumnName: 'interestsId',
  //  },
  //})
  //interests: Interest[];
  @OneToMany(() => UsersInterest, (usersInterest) => usersInterest.userId)
  usersInterests: UsersInterest[];

  @Column({ name: 'is_member' })
  isMember: boolean;
}
