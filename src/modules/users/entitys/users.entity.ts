import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { Cards } from '../../cards/cards.entity';
import { Trip } from '../../trips/entitys/trips.entity';
import { RolesByUser } from './rolesbyuser.entity';

@Entity('User')
@Unique(['email', 'phone_number'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  fullname: string;

  @Column({ unique: true, nullable: false })
  phone_number: string;

  @Column()
  photo: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)', onUpdate: 'CURRENT_TIMESTAMP(3)' })
  updated_at: Date;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Cards, card => card.user)
  cards: Cards[];

  @OneToMany(() => Trip, (trip) => trip.passenger)
  tripsAsPassenger: Trip[];

  @OneToMany(() => Trip, (trip) => trip.passenger)
  tripsAsDriver: Trip[];

  @OneToMany(() => RolesByUser, (rolesByUser) => rolesByUser.user)
  roles: RolesByUser[];

}
