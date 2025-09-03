/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Privilege } from '../entities/privilege.entity';
import { PrivilegeService } from '../providers/privilege.service';
import { CreatePrivilegeDto } from '../dto/privilege.dto/create.privilege.dto';

@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Post()
  async create(@Body() dto: CreatePrivilegeDto): Promise<Privilege> {
    return this.privilegeService.create(dto);
  }

  @Get()
  async findAll(): Promise<Privilege[]> {
    return this.privilegeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Privilege> {
    return this.privilegeService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.privilegeService.remove(Number(id));
  }
}
