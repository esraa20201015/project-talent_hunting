/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntityFields } from './base.entity';
import { Company } from './company.entity';
import { User } from './user.entity';

@Entity('departments')
export class Department extends BaseEntityFields {
  @Column()
  name: string;

  @ManyToOne(() => Company, (company) => company.departments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
