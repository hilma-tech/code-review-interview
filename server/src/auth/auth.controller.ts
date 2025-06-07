import {
  RequestUser,
  RequestUserType,
  UseCredentialsAuth,
  UseJwtAuth,
  UserService,
} from "@hilma/auth-nest";
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { type Request, type Response } from "express";
import type { TokenResponse } from "@internal/types";

import { RegisterDTO } from "./dtos/register.dto";
import { ADMIN, USER } from "./auth.roles";
import { ACCESS_TOKEN_COOKIE } from "./auth.config";

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async postRegister(@Body() credentials: RegisterDTO) {
    const { id } = await this.userService.createUser({
      ...credentials,
      roles: [USER],
    });
    return { id };
  }

  @Post("register/admin")
  async postRegisterAdmin(@Body() credentials: RegisterDTO) {
    if (process.env.NODE_ENV === "production") throw new NotFoundException();

    const { id } = await this.userService.createUser({
      ...credentials,
      roles: [USER, ADMIN],
    });
    return { id };
  }

  @Post("login")
  @UseCredentialsAuth({ roles: [USER.name, ADMIN.name] })
  postLogin(@RequestUser() requestUser: RequestUserType, @Res() res: Response) {
    const body = this.userService.login(requestUser, res, undefined, {
      // Make cookies inaccessible via client-side JavaScript
      httpOnly: true,
      // Make cookies only be accessible via HTTPS when not in development
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
    });
    res.send(body);
  }

  @Get("token")
  getToken(@Req() req: Request): TokenResponse {
    const token = req.cookies[ACCESS_TOKEN_COOKIE] || null;
    return { token };
  }

  @Get("user")
  @UseJwtAuth()
  getUser(@RequestUser() user: RequestUserType) {
    return user;
  }

  @Post("logout")
  @UseJwtAuth()
  postLogout(@Res() res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE);
    res.end();
  }
}
