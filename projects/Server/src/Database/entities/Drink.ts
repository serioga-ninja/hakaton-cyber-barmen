import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pipe } from './Pipe';

@Entity()
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column()
  capacity: number; // ml a sec

  @OneToOne(() => Pipe)
  pipe: Pipe;
}
