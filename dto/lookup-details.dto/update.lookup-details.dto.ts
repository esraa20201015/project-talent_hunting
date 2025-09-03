import { PartialType } from '@nestjs/swagger';
import { CreateLookupDetailDto } from './create.lookup-details.dto';

export class UpdateLookupDetailDto extends PartialType(CreateLookupDetailDto) {}
