import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Department } from "src/entities/department.entity";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateOrUpdateDepartmentDTO } from "./dtos/create-department.dto";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(body: CreateOrUpdateDepartmentDTO) {
    const department = await this.departmentRepository.save(
      this.departmentRepository.create({
        departmentCode: body.departmentCode,
        name: body.name,
        rooms: body.rooms,
      }),
    );

    return { department };
  }

  async updateDepartment(
    departmentId: number,
    body: CreateOrUpdateDepartmentDTO,
  ) {
    await this.departmentRepository.save({
      id: departmentId,
      departmentCode: body.departmentCode,
      name: body.name,
      rooms: body.rooms.map((room) => ({ ...room, departmentId })),
    });
  }

  async readDepartmentDetails(departmentId: number) {
    const [department] = await this.departmentRepository.find({
      where: { id: departmentId },
      select: {
        id: true,
        name: true,
        departmentCode: true,
        rooms: {
          name: true,
          roomCode: true,
        },
      },
      relations: { rooms: true },
    });

    if (!department) throw new NotFoundException();

    return department;
  }
}
