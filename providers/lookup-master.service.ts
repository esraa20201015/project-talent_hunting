import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LookupMaster } from '../entities/lookup-master.entity';

@Injectable()
export class LookupMasterService {
  async remove(id: string): Promise<void> {
    const result = await this.lookupMasterRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`LookupMaster with id "${id}" not found`);
    }
  }

  async findOne(id: string): Promise<LookupMaster> {
    const lookup = await this.lookupMasterRepository.findOne({
      where: { id: Number(id) },
      relations: ['details'],
    });
    if (!lookup) {
      throw new NotFoundException(`LookupMaster with id "${id}" not found`);
    }
    return lookup;
  }
  constructor(
    @InjectRepository(LookupMaster)
    private readonly lookupMasterRepository: Repository<LookupMaster>,
  ) {}

  async create(name: string): Promise<LookupMaster> {
    try {
      const lookup = this.lookupMasterRepository.create({ name });
      return await this.lookupMasterRepository.save(lookup);
    } catch (error) {
      console.error('Error creating lookup master:', error);
      throw new InternalServerErrorException('Failed to create lookup master');
    }
  }

  async findAll(): Promise<LookupMaster[]> {
    return this.lookupMasterRepository.find({ relations: ['details'] });
  }

  async findByName(name: string): Promise<LookupMaster> {
    const lookup = await this.lookupMasterRepository.findOne({
      where: { name },
    });
    if (!lookup)
      throw new NotFoundException(`LookupMaster "${name}" not found`);
    return lookup;
  }

  async delete(id: number): Promise<void> {
    await this.lookupMasterRepository.delete(id);
  }
}
