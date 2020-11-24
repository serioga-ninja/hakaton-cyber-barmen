import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cocktail } from './Cocktail';
import { Drink } from './Drink';

@Entity()
export class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number; // ml

  @ManyToOne(() => Drink, { onDelete: 'CASCADE' })
  drink: Drink;

  @ManyToOne(() => Cocktail, cocktail => cocktail.components, { onDelete: 'CASCADE' })
  cocktail: Cocktail;
}
