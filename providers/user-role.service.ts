import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(dto: Partial<UserRole>): Promise<UserRole> {
    try {
      const userRole = this.userRoleRepository.create(dto); // DeepPartial<UserRole>
      return await this.userRoleRepository.save(userRole); // UserRole
    } catch (error) {
      console.error('Error creating user role:', error);
      throw new InternalServerErrorException('Failed to create user role');
    }
  }

  async findAll(): Promise<UserRole[]> {
    try {
      return await this.userRoleRepository.find({
        relations: ['user', 'role'],
      });
    } catch (error) {
      console.error('Error fetching user roles:', error);
      throw new InternalServerErrorException('Failed to fetch user roles');
    }
  }

  async findOne(id: number): Promise<UserRole> {
    try {
      const userRole = await this.userRoleRepository.findOne({
        where: { id },
        relations: ['user', 'role'],
      });

      if (!userRole) {
        throw new NotFoundException(`User role with id ${id} not found`);
      }

      return userRole;
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw new InternalServerErrorException('Failed to fetch user role');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.userRoleRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`User role with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting user role:', error);
      throw new InternalServerErrorException('Failed to delete user role');
    }
  }

  async assign(userRole: Partial<UserRole>): Promise<UserRole> {
    try {
      return await this.userRoleRepository.save(userRole);
    } catch (error) {
      console.error('Error assigning role:', error);
      throw new InternalServerErrorException('Failed to assign role');
    }
  }
}
