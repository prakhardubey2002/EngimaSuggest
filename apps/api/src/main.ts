import { resolve } from 'node:path';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

config({ path: resolve(process.cwd(), '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: false,
  });
  const port = Number(process.env.BACKENED_PORT) || 3001;
  await app.listen(port);
}
void bootstrap();
