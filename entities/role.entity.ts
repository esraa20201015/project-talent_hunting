/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityFields } from './base.entity';
import { UserRole } from './user-role.entity';

@Entity('roles')
export class Role extends BaseEntityFields {
  @Column({ unique: true })
  name: string; //  admin, recruitment_user, candidate_user

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles!: UserRole[];
}
