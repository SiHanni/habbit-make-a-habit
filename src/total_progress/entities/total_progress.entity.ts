import { UsersHabit } from 'src/user/users_habits/entities/users_habit.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

Entity('total_progress');
export class TotalProgress {
  @OneToOne(() => UsersHabit, (usersHabit) => usersHabit.habitId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'habit_id' })
  habitId: UsersHabit;

  @CreateDateColumn({ name: 'last_progress', precision: 0 })
  lastProgress: Date;

  @Column({ name: 'total_success_cnt' })
  totalSuccessCnt: number;

  @Column({ name: 'continuous_cnt' })
  continuousCnt: number;

  @Column({ name: 'is_complete' })
  isComplete: boolean;

  @Column({ name: 'total_progress_time' })
  totalProgressTime: number;
}
