/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Meitstech', description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Cairo, Egypt', description: 'Company location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 150, description: 'Number of employees' })
  @IsNumber()
  employee_count: number;

  @ApiProperty({
    example: 'c29tZS1iYXNlNjQtY29kZQ==',
    description: 'Commercial ID in base64',
  })
  @IsString()
  @IsNotEmpty()
  commercial_id: string;

  @ApiProperty({
    example: '1',
    description: 'Category ID the company belongs to',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
