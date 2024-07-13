import { User } from 'src/user/users/entities/user.entity';
import { Interest } from 'src/interests/entities/interest.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('users_interests')
export class UsersInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  user_id: User;

  @ManyToOne(() => Interest, (interests) => interests.interestsId, {
    onDelete: 'CASCADE',
  })
  interests_id: Interest;
}
