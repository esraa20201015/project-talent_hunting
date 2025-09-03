/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntityFields } from './base.entity';
import { Category } from './category.entity';
import { Department } from './department.entity';
import { User } from './user.entity';

@Entity('companies')
export class Company extends BaseEntityFields {
  @Column()
  name: string;

  @Column()
  location!: string;

  @Column()
  employee_count: number;

  @Column({ type: 'text' })
  commercial_id: string; // base64

  @ManyToOne(() => Category, (category) => category.companies, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Department, (department) => department.company)
  departments: Department[];

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
