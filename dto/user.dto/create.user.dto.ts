/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ahmed Ali', description: 'Full name' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'ahmed@example.com', description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'hashedpassword', description: 'Password (hashed)' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'aW1hZ2UtYmFzZTY0',
    description: 'User image in base64',
    required: false,
  })
  @IsString()
  @IsOptional()
  user_img?: string;

  @ApiProperty({
    example: 'company-uuid',
    description: 'Company ID',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  companyId?: number;

  @ApiProperty({
    example: 'department-uuid',
    description: 'Department ID',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  departmentId?: number;

  @ApiProperty({
    example: ['role-uuid1', 'role-uuid2'],
    description: 'Role IDs assigned to user',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roleIds?: string[];
}
