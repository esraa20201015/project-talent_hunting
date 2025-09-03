/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../providers/user.service';
import { CreateUserDto } from '../dto/user.dto/create.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    // Convert string[] roleIds (if present) to number[] before passing to service
    const { roleIds, ...rest } = dto;
    let parsedRoleIds: number[] | undefined = undefined;
    if (Array.isArray(roleIds)) {
      parsedRoleIds = roleIds
        .map((id) => Number(id))
        .filter((id: number) => !isNaN(id));
    }
    // Pass parsedRoleIds (number[] | undefined) to the service, but ensure the type matches the service's expected input
    return this.userService.create({ ...rest, roleIds: parsedRoleIds as any });
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
