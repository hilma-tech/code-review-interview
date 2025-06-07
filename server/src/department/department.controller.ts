import { Body, Controller, Post } from "@nestjs/common";

import { CreateDepartmentDTO } from "./dtos/create-department.dto";
import { DepartmentService } from "./department.service";

@Controller("department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  post(@Body() body: CreateDepartmentDTO) {
    return this.departmentService.createDepartment(body);
  }
}
