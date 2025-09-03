/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoryService } from '../providers/category.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/category.dto/create.category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a new category
  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(dto);
  }

  // Get all categories
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  // Get a single category by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  // Delete a category by id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.categoryService.remove(id);
    return { message: `Category with id ${id} has been deleted` };
  }
}
