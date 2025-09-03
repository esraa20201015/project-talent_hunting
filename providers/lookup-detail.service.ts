import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LookupDetail } from '../entities/lookup-detail.entity';

@Injectable()
export class LookupDetailService {
  constructor(
    @InjectRepository(LookupDetail)
    private readonly lookupDetailRepository: Repository<LookupDetail>,
  ) {}

  async create(dto: Partial<LookupDetail>): Promise<LookupDetail> {
    try {
      const lookupDetail = this.lookupDetailRepository.create(dto);
      return await this.lookupDetailRepository.save(lookupDetail);
    } catch (error) {
      console.error('Error creating lookup detail:', error);
      throw new InternalServerErrorException('Failed to create lookup detail');
    }
  }

  async findAll(): Promise<LookupDetail[]> {
    try {
      return await this.lookupDetailRepository.find({ relations: ['master'] });
    } catch (error) {
      console.error('Error fetching lookup details:', error);
      throw new InternalServerErrorException('Failed to fetch lookup details');
    }
  }

  async findOne(id: number): Promise<LookupDetail> {
    try {
      const lookupDetail = await this.lookupDetailRepository.findOne({
        where: { id },
        relations: ['master'],
      });

      if (!lookupDetail) {
        throw new NotFoundException(`LookupDetail with id ${id} not found`);
      }

      return lookupDetail;
    } catch (error) {
      console.error('Error fetching lookup detail:', error);
      throw new InternalServerErrorException('Failed to fetch lookup detail');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.lookupDetailRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`LookupDetail with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting lookup detail:', error);
      throw new InternalServerErrorException('Failed to delete lookup detail');
    }
  }
}
