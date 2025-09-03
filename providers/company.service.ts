/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/company.dto/create.company.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(dto: CreateCompanyDto): Promise<Company> {
    try {
      const company = this.companyRepository.create(dto);
      return await this.companyRepository.save(company);
    } catch (error) {
      console.error('Error creating company:', error);
      throw new InternalServerErrorException('Failed to create company');
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return await this.companyRepository.find({ relations: ['category'] });
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw new InternalServerErrorException('Failed to fetch companies');
    }
  }

  async findOne(id: string): Promise<Company> {
    try {
      const company = await this.companyRepository.findOne({
        where: { id: parseInt(id, 10) },
        relations: ['category'],
      });

      if (!company) {
        throw new Error(`Company with id ${id} not found`);
      }

      return company;
    } catch (error) {
      console.error('Error fetching company:', error);
      throw new InternalServerErrorException('Failed to fetch company');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.companyRepository.delete({
        id: parseInt(id, 10),
      });

      if (result.affected === 0) {
        throw new Error(`Company with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      throw new InternalServerErrorException('Failed to delete company');
    }
  }
}
