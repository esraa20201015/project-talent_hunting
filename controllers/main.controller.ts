import { Controller } from '@nestjs/common';
import { CategoryService } from '../providers/category.service';
import { CompanyService } from '../providers/company.service';
import { DepartmentService } from '../providers/department.service';
import { UserService } from '../providers/user.service';
import { RoleService } from '../providers/role.service';
import { PrivilegeService } from '../providers/privilege.service';
import { UserRoleService } from '../providers/user-role.service';
import { LookupMasterService } from '../providers/lookup-master.service';
import { LookupDetailService } from '../providers/lookup-detail.service';

@Controller('main')
export class MainController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly companyService: CompanyService,
    private readonly departmentService: DepartmentService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly privilegeService: PrivilegeService,
    private readonly userRoleService: UserRoleService,
    private readonly lookupMasterService: LookupMasterService,
    private readonly lookupDetailService: LookupDetailService,
  ) {}
}
