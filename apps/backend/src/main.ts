import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IngestionService } from './ingestion/ingestion.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // TEMP: manual test trigger
  const ingestionService = app.get(IngestionService);
  await ingestionService.fetchFrontPages();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
