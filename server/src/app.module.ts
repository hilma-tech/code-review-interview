import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { getDataSourceOptions } from "./data-source.options";
import { DepartmentModule } from "./department/department.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getDataSourceOptions,
    }),
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
