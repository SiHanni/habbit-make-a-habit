import { UsersInterest } from 'src/user/users_interests/entities/users_interest.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('interests')
export class Interest {
  @PrimaryGeneratedColumn({ name: 'id' })
  interestsId: number;

  @Column()
  category: string;

  @OneToMany(() => UsersInterest, (usersInterest) => usersInterest.interestsId)
  usersInterests: UsersInterest[];
  //@ManyToMany(() => User, { cascade: true })
  //users: User[];
}
