import { User } from 'src/user/users/entities/user.entity';
import { Interest } from 'src/interests/entities/interest.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users_interests')
export class UsersInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  userId: User;

  @ManyToOne(() => Interest, (interests) => interests.interestsId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  interestsId: Interest;
}
