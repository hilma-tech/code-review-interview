import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Department } from "src/entities/department.entity";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateDepartmentDTO } from "./dtos/create-department.dto";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(body: CreateDepartmentDTO) {
    const department = await this.departmentRepository.save(
      this.departmentRepository.create({
        departmentCode: body.departmentCode,
        name: body.name,
        rooms: body.rooms,
      }),
    );

    return { department };
  }
}
