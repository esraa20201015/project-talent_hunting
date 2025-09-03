/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'IT Department', description: 'Department name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Handles software and infrastructure',
    description: 'Optional description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'company-uuid',
    description: 'Company ID this department belongs to',
  })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
