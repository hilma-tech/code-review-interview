import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class CreateDepartmentRoomDTO {
  @IsOptional()
  @IsString()
  roomCode?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class CreateDepartmentDTO {
  @IsOptional()
  @IsString()
  departmentCode?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDepartmentRoomDTO)
  rooms!: CreateDepartmentRoomDTO[];
}
