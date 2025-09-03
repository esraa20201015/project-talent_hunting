/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLookupDetailDto {
  @ApiProperty({ example: 'Male', description: 'Detail value' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example: 'lookup-master-uuid',
    description: 'Master category ID',
  })
  @IsString()
  @IsNotEmpty()
  masterId: string;
}
