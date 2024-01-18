import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { Trip } from '../trips/entitys/trips.entity'; 

@Entity('Transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_trip' })
  idTrip: number;

  @Column({ name: 'id_wompi', unique: true, nullable: false })
  idWompi: string;

  @Column({ unique: true, nullable: false })
  reference: string;

  @Column({ name: 'total_amount', type: 'double precision' })
  totalAmount: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 3, nullable: true })
  updatedAt: Date;

  @OneToOne(() => Trip, trip => trip.transaction)
  @JoinColumn({ name: 'id' }) 
  trip: Trip;
}
