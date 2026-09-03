import { Module } from '@nestjs/common';
import { FrontPageController } from './frontpage.controller';
import { FrontPageService } from './frontpage.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IngestionModule } from 'src/ingestion/ingestion.module';

@Module({
  imports: [PrismaModule, IngestionModule],
  controllers: [FrontPageController],
  providers: [FrontPageService],
  exports: [FrontPageService],
})
export class FrontPageModule {}
