import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Room } from "./room.entity";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "department_code", type: "varchar", nullable: true })
  departmentCode!: string | null;

  @Column()
  name!: string;

  @OneToMany(() => Room, (room) => room.department, { cascade: true })
  rooms!: Room[];
}
