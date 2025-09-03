import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Privilege } from '../entities/privilege.entity';
import { CreatePrivilegeDto } from '../dto/privilege.dto/create.privilege.dto';
import { UpdatePrivilegeDto } from '../dto/privilege.dto/update.privilege.dto';

@Injectable()
export class PrivilegeService {
  constructor(
    @InjectRepository(Privilege)
    private readonly privilegeRepository: Repository<Privilege>,
  ) {}

  async create(dto: CreatePrivilegeDto): Promise<Privilege> {
    try {
      const privilege = this.privilegeRepository.create(dto);
      return await this.privilegeRepository.save(privilege);
    } catch (error) {
      console.error('Error creating privilege:', error);
      throw new InternalServerErrorException('Failed to create privilege');
    }
  }

  async findAll(): Promise<Privilege[]> {
    try {
      return await this.privilegeRepository.find();
    } catch (error) {
      console.error('Error fetching privileges:', error);
      throw new InternalServerErrorException('Failed to fetch privileges');
    }
  }

  async findOne(id: number): Promise<Privilege> {
    try {
      const privilege = await this.privilegeRepository.findOne({
        where: { id },
      });
      if (!privilege) {
        throw new NotFoundException(`Privilege with id ${id} not found`);
      }
      return privilege;
    } catch (error) {
      console.error('Error fetching privilege:', error);
      throw new InternalServerErrorException('Failed to fetch privilege');
    }
  }

  async update(id: number, dto: UpdatePrivilegeDto): Promise<Privilege> {
    try {
      const privilege = await this.findOne(id);
      Object.assign(privilege, dto);
      return await this.privilegeRepository.save(privilege);
    } catch (error) {
      console.error('Error updating privilege:', error);
      throw new InternalServerErrorException('Failed to update privilege');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.privilegeRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Privilege with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting privilege:', error);
      throw new InternalServerErrorException('Failed to delete privilege');
    }
  }

  async findByName(name: string): Promise<Privilege> {
    try {
      const privilege = await this.privilegeRepository.findOne({
        where: { name },
      });
      if (!privilege) {
        throw new NotFoundException(`Privilege "${name}" not found`);
      }
      return privilege;
    } catch (error) {
      console.error('Error fetching privilege by name:', error);
      throw new InternalServerErrorException(
        'Failed to fetch privilege by name',
      );
    }
  }
}
