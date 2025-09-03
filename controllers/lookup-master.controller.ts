/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LookupMaster } from '../entities/lookup-master.entity';
import { LookupMasterService } from '../providers/lookup-master.service';
import { CreateLookupMasterDto } from '../dto/lookup-master.dto/create.lookup-master.dtp';

@Controller('lookup-master')
export class LookupMasterController {
  constructor(private readonly lookupMasterService: LookupMasterService) {}

  @Post()
  create(@Body() dto: CreateLookupMasterDto): Promise<LookupMaster> {
    return this.lookupMasterService.create(dto.name);
  }

  @Get()
  findAll(): Promise<LookupMaster[]> {
    return this.lookupMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LookupMaster> {
    return this.lookupMasterService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.lookupMasterService.remove(id);
  }
}
