import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Cocktail } from './Cocktail';

export enum OrderStatus {
  CREATED,
  IN_PROGRES,
  READY
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-enum', enum: OrderStatus, default: OrderStatus.CREATED })
  status: OrderStatus;

  @Column('integer', { nullable: false })
  cocktailId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Cocktail, cocktail => cocktail.orders)
  @JoinTable()
  cocktail: Cocktail;
}
