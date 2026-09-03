import { Controller, Get } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Get()
  runIngestion() {
    return this.ingestionService.runDailyIngestion();
  }
}
