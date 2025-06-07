import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Department } from "./department.entity";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "room_code", type: "varchar", nullable: true })
  roomCode!: string | null;

  @Column()
  name!: string;

  @Column({ name: "department_id" })
  departmentId!: number;

  @ManyToOne(() => Department, (department) => department.rooms, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "department_id" })
  department!: Department;
}
