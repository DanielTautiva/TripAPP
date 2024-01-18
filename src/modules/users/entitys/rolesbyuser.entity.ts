// roles-by-user.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from './users.entity';
  import { Roles } from './roles.entity';
  
  @Entity('RolesByUser')
  export class RolesByUser {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.roles)
    @JoinColumn({ name: 'id_user' })
    user: User;
  
    @ManyToOne(() => Roles, (role) => role.users)
    @JoinColumn({ name: 'id_role' })
    role: Roles;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(3)' })
    updated_at: Date;
  }
  