import { PartialType } from '@nestjs/swagger';
import { AdminSetupDto } from './create.admin.dto';

export class UpdateLookupDetailDto extends PartialType(AdminSetupDto) {}
