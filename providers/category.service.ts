/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/category.dto/create.category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Create a new category
  async create(dto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(dto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      console.error('Error creating category:', error);
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  // Get all categories
  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({ relations: ['companies'] });
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  // Get a single category by id
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['companies'],
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  // Delete a category by id
  async remove(id: string): Promise<void> {
    const result = await this.categoryRepository.delete({
      id: parseInt(id, 10),
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }
}
