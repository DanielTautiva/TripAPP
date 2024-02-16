import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  BeforeInsert
} from 'typeorm';
import { TripStatus } from './tripstatus.entity'; 
import { User } from 'src/modules/users/entitys/users.entity';
import { Transaction } from 'src/modules/transactions/transactions.entity';

@Entity('Trip')
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tripsAsPassenger)
  @JoinColumn({ name: 'id_user' })
  passenger: User;

  @ManyToOne(() => User, (user) => user.tripsAsDriver)
  @JoinColumn({ name: 'id_driver' })
  driver: User;

  @Column()
  start_location: string;

  @Column()
  end_location: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
  complete_at: Date;

  @OneToOne(() => TripStatus, (status) => status.trip)
  @JoinColumn({ name: 'status'})
  status: TripStatus ;

  @OneToOne(() => Transaction, transaction => transaction.trip) 
  @JoinColumn({ name: 'id' }) 
  transaction: Transaction;

  @BeforeInsert()
  setDefaultStatus() {
    if (!this.status) {
      this.status = new TripStatus();
      this.status.id = 3;
    }
  }

}
