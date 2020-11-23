import { Column, Entity, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Component } from './Component';
import { Order } from './Order';

@Entity()
export class Cocktail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Component, component => component.cocktail, { onDelete: 'CASCADE' })
  @JoinTable()
  components: Component[];

  @OneToMany(() => Order, order => order.cocktail)
  orders: Order;
}
