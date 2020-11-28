import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drink } from './Drink';

@Entity()
export class Pipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drinkId: number;

  @Column({ default: 700 }) // ml
  capacity: number;

  @Column({ default: 500 }) // ml
  capacityLeft: number;

  @ManyToOne(() => Drink, { cascade: true })
  @JoinTable()
  drink: Drink;
}
