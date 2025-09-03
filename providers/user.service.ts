// src/admins/providers/user.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { Role } from '../entities/role.entity';
import { CreateUserDto } from '../dto/user.dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(dto: CreateUserDto & { roleIds?: number[] }): Promise<User> {
    try {
      const user = this.userRepository.create(dto);
      await this.userRepository.save(user);

      if (dto.roleIds?.length) {
        const userRoles = dto.roleIds.map((roleId) => {
          const ur = new UserRole();
          ur.user = user;
          ur.role = { id: roleId } as unknown as Role;
          return ur;
        });
        await this.userRoleRepository.save(userRoles);
      }

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({ 
        relations: ['company', 'department', 'userRoles', 'userRoles.role'] 
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: parseInt(id, 10) },
        relations: ['company', 'department', 'userRoles', 'userRoles.role'],
      });

      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.userRepository.delete({
        id: parseInt(id, 10),
      });

      if (result.affected === 0) {
        throw new Error(`User with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  async assignRole(user: User, role: Role): Promise<void> {
    try {
      const userRole = this.userRoleRepository.create({ user, role });
      await this.userRoleRepository.save(userRole);
    } catch (error) {
      console.error('Error assigning role:', error);
      throw new InternalServerErrorException('Failed to assign role');
    }
  }
}
