import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cocktail } from './Cocktail';
import { Drink } from './Drink';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @OneToOne(() => Drink)
  @JoinColumn()
  drink: Drink;

  @OneToOne(() => Cocktail)
  @JoinColumn()
  cocktail: Cocktail;
}
