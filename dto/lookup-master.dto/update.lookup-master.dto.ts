import { PartialType } from '@nestjs/swagger';
import { CreateLookupMasterDto } from './create.lookup-master.dtp';

export class UpdateLookupMasterDto extends PartialType(CreateLookupMasterDto) {}
