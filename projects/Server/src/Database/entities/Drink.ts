import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cocktail } from './Cocktail';

@Entity()
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
}
