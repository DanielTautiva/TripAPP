// cards.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/entitys/users.entity';

@Entity('Cards')
export class Cards {
  @PrimaryGeneratedColumn('increment')
  id_card: number;

  @Column()
  id_user: number;

  @Column({ type: 'text', nullable: false })
  token: string;

  @ManyToOne(() => User, user => user.cards)
  @JoinColumn({ name: 'id_user' })
  user: User;
}
