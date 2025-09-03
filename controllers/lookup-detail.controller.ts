/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LookupDetail } from '../entities/lookup-detail.entity';
import { LookupDetailService } from '../providers/lookup-detail.service';
import { CreateLookupDetailDto } from '../dto/lookup-details.dto/create.lookup-details.dto';

@Controller('lookup-detail')
export class LookupDetailController {
  constructor(private readonly lookupDetailService: LookupDetailService) {}

  @Post()
  create(@Body() dto: CreateLookupDetailDto): Promise<LookupDetail> {
    return this.lookupDetailService.create(dto);
  }

  @Get()
  findAll(): Promise<LookupDetail[]> {
    return this.lookupDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LookupDetail> {
    return this.lookupDetailService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.lookupDetailService.remove(Number(id));
  }
}
