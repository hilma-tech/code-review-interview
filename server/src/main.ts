import { HELLO_WORLD } from "@internal/constants";
import type { Test } from "@internal/types";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);

  const test: Test = HELLO_WORLD;
  // eslint-disable-next-line no-console -- example of internal packages :)
  console.log(test);
}
void bootstrap();
