import { join } from "path";

import { type TypeOrmModuleOptions } from "@nestjs/typeorm";

export function getDataSourceOptions() {
  return {
    type: "mysql",
    logging: true,
    connectorPackage: "mysql2",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [join(__dirname, "./entities/*.entity.js")],
    migrations: [join(__dirname, "./migrations/*.js")],
    migrationsRun: true,
  } satisfies TypeOrmModuleOptions;
}
