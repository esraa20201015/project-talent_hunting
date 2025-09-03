/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Category } from './entities/category.entity';
import { Company } from './entities/company.entity';
import { Department } from './entities/department.entity';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Privilege } from './entities/privilege.entity';
import { UserRole } from './entities/user-role.entity';
import { LookupMaster } from './entities/lookup-master.entity';
import { LookupDetail } from './entities/lookup-detail.entity';

// Services
import { CategoryService } from './providers/category.service';
import { CompanyService } from './providers/company.service';
import { DepartmentService } from './providers/department.service';
import { UserService } from './providers/user.service';
import { RoleService } from './providers/role.service';
import { PrivilegeService } from './providers/privilege.service';
import { LookupDetailService } from './providers/lookup-detail.service';
import { LookupMasterService } from './providers/lookup-master.service';
import { UserRoleService } from './providers/user-role.service';

// Main Controller
import { MainController } from './controllers/main.controller';
// Feature Controllers
import { CategoryController } from './controllers/category.controller';
import { CompanyController } from './controllers/company.controller';
import { DepartmentController } from './controllers/department.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { PrivilegeController } from './controllers/privilege.controller';
import { UserRoleController } from './controllers/user-role.controller';
import { LookupMasterController } from './controllers/lookup-master.controller';
import { LookupDetailController } from './controllers/lookup-detail.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Company,
      Department,
      User,
      Role,
      Privilege,
      UserRole,
      LookupMaster,
      LookupDetail,
    ]),
  ],
  controllers: [
    MainController,
    CategoryController,
    CompanyController,
    DepartmentController,
    UserController,
    RoleController,
    PrivilegeController,
    UserRoleController,
    LookupMasterController,
    LookupDetailController,
  ],
  providers: [
    CategoryService,
    CompanyService,
    DepartmentService,
    UserService,
    RoleService,
    PrivilegeService,
    UserRoleService,
    LookupMasterService,
    LookupDetailService,
  ],
  exports: [
    CategoryService,
    CompanyService,
    DepartmentService,
    UserService,
    RoleService,
    PrivilegeService,
    UserRoleService,
    LookupMasterService,
    LookupDetailService,
  ],
})
export class AdminsModule {}
