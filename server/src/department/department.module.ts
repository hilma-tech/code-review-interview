import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "src/entities/department.entity";
import { Room } from "src/entities/room.entity";

import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./department.service";

@Module({
  imports: [TypeOrmModule.forFeature([Department, Room])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
