import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drink } from './Drink';

@Entity()
export class Pipe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Drink)
  @JoinTable()
  drink: Drink;
}
