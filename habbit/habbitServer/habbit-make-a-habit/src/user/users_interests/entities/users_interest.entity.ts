import { User } from 'src/user/users/entities/user.entity';
import { Interest } from 'src/interests/entities/interest.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users_interests')
export class UsersInterest {
  @PrimaryGeneratedColumn({ name: 'users_interests_id' })
  usersInterestsId: number;

  @ManyToOne(() => User, (user) => user.usersInterests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Interest, (interest) => interest.usersInterests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'interests_id' })
  interests: Interest;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  createdAt: Date;
}
