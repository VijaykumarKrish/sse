import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const lazyModuleLoader = app.get(LazyModuleLoader);
  // const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
