// roles.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { RolesByUser } from './rolesbyuser.entity';
  
  @Entity('Roles')
  export class Roles {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
    updated_at: Date;
  
    @OneToMany(() => RolesByUser, (rolesByUser) => rolesByUser.role)
    users: RolesByUser[];
  }
  