import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('points')
export class Point {
  @PrimaryGeneratedColumn({ name: 'id' })
  pointId: number;

  @Column()
  category: string;

  @Column()
  point: number;
}
