/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntityFields } from './base.entity';
import { LookupMaster } from './lookup-master.entity';

@Entity('lookup_details')
export class LookupDetail extends BaseEntityFields {
  @Column()
  value: string; //  Male, Female, Egyptian, American

  @ManyToOne(() => LookupMaster, (master) => master.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lookup_master_id' })
  lookupMaster!: LookupMaster;
}
