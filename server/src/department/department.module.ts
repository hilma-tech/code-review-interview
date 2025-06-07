import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "src/entities/department.entity";
import { UserModule } from "@hilma/auth-nest";

import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./department.service";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
