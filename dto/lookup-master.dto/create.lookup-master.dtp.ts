/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLookupMasterDto {
  @ApiProperty({ example: 'Gender', description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
