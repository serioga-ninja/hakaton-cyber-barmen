import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Component } from './Component';
import { Drink } from './Drink';

@Entity()
export class Cocktail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Component, component => component.cocktail, { onDelete: 'CASCADE' })
  @JoinTable()
  components: Component[];
}
