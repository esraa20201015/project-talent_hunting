import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dto/department.dto/create.department.dto';
import { Company } from '../entities/company.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(dto: CreateDepartmentDto): Promise<Department> {
    try {
      const department = this.departmentRepository.create({
        name: dto.name,
        company: { id: dto.companyId } as unknown as Company, // assign relation by id safely
      });
      return await this.departmentRepository.save(department);
    } catch (error) {
      console.error('Error creating department:', error);
      throw new InternalServerErrorException('Failed to create department');
    }
  }

  async findAll(): Promise<Department[]> {
    try {
      return await this.departmentRepository.find({ relations: ['company'] });
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw new InternalServerErrorException('Failed to fetch departments');
    }
  }

  async findOne(id: number): Promise<Department> {
    try {
      const department = await this.departmentRepository.findOne({
        where: { id },
        relations: ['company'],
      });
      if (!department)
        throw new NotFoundException(`Department with id ${id} not found`);
      return department;
    } catch (error) {
      console.error('Error fetching department:', error);
      throw new InternalServerErrorException('Failed to fetch department');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.departmentRepository.delete(id);
      if (result.affected === 0)
        throw new NotFoundException(`Department with id ${id} not found`);
    } catch (error) {
      console.error('Error deleting department:', error);
      throw new InternalServerErrorException('Failed to delete department');
    }
  }
}
