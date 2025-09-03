/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CompanyService } from './company.service';
import { DepartmentService } from './department.service';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { AdminSetupDto } from '../dto/admin.dto/create.admin.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AdminsService {
  constructor(
    /*
     * Inject entity-specific services to coordinate workflow
     */
    private readonly categoryService: CategoryService,
    private readonly companyService: CompanyService,
    private readonly departmentService: DepartmentService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  /*
   * Perform full admin setup:
   */
  async adminSetup(dto: AdminSetupDto): Promise<User> {
    try {
      // Create Category
      const category = await this.categoryService.create(dto.category);

      //  Create Company linked to the category
      const company = await this.companyService.create({
        ...dto.company,
        categoryId: String(category.id),
      });

      //  Create Department linked to the company
      const department = await this.departmentService.create({
        ...dto.department,
        companyId: String(company.id),
      });

      //  Create User linked to company & department
      const user = await this.userService.create({
        ...dto.user,
        // categoryId: category.id,
        departmentId: department.id,
        roleIds: dto.roleIds,
      });

      //  Assign Roles explicitly
      if (dto.roleIds?.length) {
        for (const roleId of dto.roleIds) {
          const role = this.roleService.findById(roleId); // fetch role
          await this.userService.assignRole(user, await role); // separate assignRole method in UserService
        }
      }

      return user;
    } catch (error) {
      console.error('Error in admin setup:', error);
      throw new InternalServerErrorException('Failed to perform admin setup');
    }
  }
}
