import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import type { DepartmentResponse } from "@internal/types";

import { CreateOrUpdateDepartmentDTO } from "./dtos/create-department.dto";
import { DepartmentService } from "./department.service";

@Controller("department")
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  post(@Body() body: CreateOrUpdateDepartmentDTO) {
    return this.departmentService.createDepartment(body);
  }

  @Put(":departmentId")
  putByDepartmentId(
    @Param("departmentId", ParseIntPipe) departmentId: number,
    @Body() body: CreateOrUpdateDepartmentDTO,
  ) {
    return this.departmentService.updateDepartment(departmentId, body);
  }

  @Get("details/:departmentId")
  getDetailsByDepartmentId(
    @Param("departmentId", ParseIntPipe) departmentId: number,
  ): Promise<DepartmentResponse.DepartmentDetails> {
    return this.departmentService.readDepartmentDetails(departmentId);
  }
}
