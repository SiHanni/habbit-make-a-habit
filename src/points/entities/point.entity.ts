import { UsersPoint } from 'src/user/users_points/entities/users_point.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity('points')
export class Point {
  @PrimaryGeneratedColumn({ name: 'id' })
  pointId: number;

  @Column()
  category: string;

  @Column()
  point: number;

  @OneToMany(() => UsersPoint, (usersPoint) => usersPoint.usersPointsId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  usersPoint: UsersPoint[];
}
