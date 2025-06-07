import { DataSource } from "typeorm";
import { config } from "dotenv";

import { getDataSourceOptions } from "./data-source.options";

config({ path: ".env.development" });

export default new DataSource(getDataSourceOptions());
