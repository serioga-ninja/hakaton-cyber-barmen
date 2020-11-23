import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @Column('integer', { name: 'client_id', nullable: false })
  cocktailId: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToOne(() => Cocktail)
  cocktail: Cocktail;
}
