// trip-status.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { Trip } from './trips.entity';
  
  @Entity('TripStatus')
  export class TripStatus {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
    updated_at: Date;
  
    @OneToOne(() => Trip, (trip) => trip.status)
    @JoinColumn()
    trip: Trip;
  }
  