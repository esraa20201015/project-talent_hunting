// user-role.entity.ts
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { BaseEntityFields } from './base.entity';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity('user_roles')
export class UserRole extends BaseEntityFields {
  @ManyToOne(() => User, (user) => user.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  declare status: 'active' | 'inactive';
}
