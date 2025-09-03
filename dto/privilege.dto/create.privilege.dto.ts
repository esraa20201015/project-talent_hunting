/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePrivilegeDto {
  @ApiProperty({ example: 'view_opportunity', description: 'Privilege name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Can view job opportunities',
    description: 'Optional description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
