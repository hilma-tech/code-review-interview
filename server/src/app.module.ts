import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import authConfig from "./auth/auth.config";
import { getDataSourceOptions } from "./data-source.options";
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [authConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getDataSourceOptions,
    }),
    AuthModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
