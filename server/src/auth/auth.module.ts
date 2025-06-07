import { Module } from "@nestjs/common";
import { RoleModule, UserModule } from "@hilma/auth-nest";

import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  imports: [UserModule, RoleModule],
})
export class AuthModule {}
