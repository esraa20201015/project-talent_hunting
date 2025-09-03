import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { Department } from '../entities/department.entity';
import { DepartmentService } from '../providers/department.service';
import { CreateDepartmentDto } from '../dto/department.dto/create.department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() dto: CreateDepartmentDto): Promise<Department> {
    if (!dto.companyId) {
      throw new BadRequestException(
        'companyId is required to create a department.',
      );
    }
    return this.departmentService.create(dto);
  }

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Department> {
    return this.departmentService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.departmentService.remove(id);
  }
}
