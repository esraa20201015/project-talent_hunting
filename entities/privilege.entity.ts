/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, Column } from 'typeorm';
import { BaseEntityFields } from './base.entity';
@Entity('privileges')
export class Privilege extends BaseEntityFields {
  // view_opportunity, edit_company
  @Column({ unique: true })
  name: string;
}
