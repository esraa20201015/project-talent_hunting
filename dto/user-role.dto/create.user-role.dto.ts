/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty({ example: 'user-uuid', description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'role-uuid', description: 'Role ID' })
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({ example: 'admin', description: 'Role name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'active', description: 'Status of the role' })
  @IsString()
  @IsIn(['active', 'inactive'])
  status: string;
}
