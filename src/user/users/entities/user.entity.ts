import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  //BeforeInsert,
} from 'typeorm';
import { UsersInterest } from 'src/user/users_interests/entities/users_interest.entity';
//import * as bcrypt from 'bcrypt';

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

  @Column({ name: 'is_member', default: false })
  isMember: boolean;

  //@BeforeInsert()
  //async hashPassword() {
  //  this.password = await bcrypt.hash(this.password, 10);
  //}
}
