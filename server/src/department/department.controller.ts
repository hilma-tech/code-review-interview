import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { CreateDepartmentDTO } from "./dtos/create-department.dto";
import { DepartmentService } from "./department.service";

@Controller("department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  post(@Body() body: CreateDepartmentDTO) {
    return this.departmentService.createDepartment(body);
  }

  @Get()
  get(@Query() queryParams: { search: string; page: number; limit: number }) {
    return this.departmentService.readDepartments(queryParams);
  }
}
