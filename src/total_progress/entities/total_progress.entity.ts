import { UsersHabit } from 'src/user/users_habits/entities/users_habit.entity';
import { Entity, Column, CreateDateColumn, OneToOne } from 'typeorm';

Entity('total_progress');
export class TotalProgress {
  @OneToOne(() => UsersHabit, (usersHabit) => usersHabit.habitId)
  habitId: number;

  @CreateDateColumn({ name: 'last_progress' })
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
