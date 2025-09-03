/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityFields } from './base.entity';
import { Company } from './company.entity';

@Entity('categories')
export class Category extends BaseEntityFields {
  @Column({ unique: true })
  name: string; // Private, Public

  @OneToMany(() => Company, (company) => company.category)
  companies: Company[];
}
