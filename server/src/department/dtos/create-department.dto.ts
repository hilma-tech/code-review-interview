import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class CreateOrUpdateDepartmentRoomDTO {
  @IsOptional()
  @IsString()
  roomCode?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class CreateOrUpdateDepartmentDTO {
  @IsOptional()
  @IsString()
  departmentCode?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrUpdateDepartmentRoomDTO)
  rooms!: CreateOrUpdateDepartmentRoomDTO[];
}
