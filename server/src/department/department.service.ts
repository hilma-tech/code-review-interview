import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Department } from "src/entities/department.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "src/entities/room.entity";

import { CreateOrUpdateDepartmentDTO } from "./dtos/create-department.dto";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
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

  async readDepartments({
    search,
    page,
    limit,
  }: {
    search: string;
    page: number;
    limit: number;
  }) {
    const qb = this.departmentRepository.createQueryBuilder();
    if (search) qb.where(`name LIKE '%${search}%'`);
    const departments = await qb.getMany();

    const rooms = await this.roomRepository.createQueryBuilder().getMany();

    return departments
      .map((department) => ({
        ...department,
        roomsCount: rooms.filter((room) => room.departmentId === department.id)
          .length,
      }))
      .slice((page - 1) * limit, limit);
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
