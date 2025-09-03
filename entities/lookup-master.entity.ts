/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityFields } from './base.entity';
import { LookupDetail } from './lookup-detail.entity';

@Entity('lookup_masters')
export class LookupMaster extends BaseEntityFields {
  @Column({ unique: true })
  name: string; //  gender, nationality

  @OneToMany(() => LookupDetail, (detail) => detail.lookupMaster)
  details!: LookupDetail[];
}
