import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserRole } from '../entities/user-role.entity';
import { UserRoleService } from '../providers/user-role.service';
import { CreateUserRoleDto } from '../dto/user-role.dto/create.user-role.dto';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  async create(@Body() dto: CreateUserRoleDto): Promise<UserRole> {
    if (dto.status && dto.status !== 'active' && dto.status !== 'inactive') {
      throw new BadRequestException(
        "Invalid status value. Must be 'active' or 'inactive'.",
      );
    }

    return this.userRoleService.create({
      ...dto,
      status: dto.status as 'active' | 'inactive' | undefined,
    });
  }
}