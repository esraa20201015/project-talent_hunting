/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-return*/

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/role.dto/create.role.dto';

@Injectable()
export class RoleService {
  findAll(): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
  findOne: any;
  remove(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    try {
      const role = this.roleRepository.create(dto);
      return await this.roleRepository.save(role);
    } catch (error) {
      console.error('Error creating role:', error);
      throw new InternalServerErrorException('Failed to create role');
    }
  }

  async findById(id: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) throw new NotFoundException(`Role with id ${id} not found`);
      return role;
    } catch (error) {
      console.error('Error fetching role:', error);
      throw new InternalServerErrorException('Failed to fetch role');
    }
  }

  async findByName(name: string): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({ where: { name } });
      if (!role)
        throw new NotFoundException(`Role with name "${name}" not found`);
      return role;
    } catch (error) {
      console.error('Error fetching role by name:', error);
      throw new InternalServerErrorException('Failed to fetch role by name');
    }
  }
}
