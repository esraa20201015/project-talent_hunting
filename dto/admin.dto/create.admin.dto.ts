/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from '../category.dto/create.category.dto';
import { CreateCompanyDto } from '../company.dto/create.company.dto';
import { CreateDepartmentDto } from '../department.dto/create.department.dto';
import { CreateUserDto } from '../user.dto/create.user.dto';

export class AdminSetupDto {
  @ApiProperty({ type: CreateCategoryDto })
  category: CreateCategoryDto;

  @ApiProperty({ type: CreateCompanyDto })
  company: CreateCompanyDto;

  @ApiProperty({ type: CreateDepartmentDto })
  department: CreateDepartmentDto;

  @ApiProperty({ type: CreateUserDto })
  user: CreateUserDto;

  @ApiProperty({ example: ['recruiter'], description: 'Roles for the user' })
  roleNames: string[];
  roleIds: any;
}
