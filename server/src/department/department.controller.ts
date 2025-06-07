import { Body, Controller, Post } from "@nestjs/common";
import { UseJwtAuth } from "@hilma/auth-nest";
import { ADMIN } from "src/auth/auth.roles";

import { CreateDepartmentDTO } from "./dtos/create-department.dto";
import { DepartmentService } from "./department.service";

@Controller("department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseJwtAuth({ roles: [ADMIN.name] })
  @Post()
  post(@Body() body: CreateDepartmentDTO) {
    return this.departmentService.createDepartment(body);
  }
}
