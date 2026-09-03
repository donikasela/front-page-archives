import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFrontPageDto } from './dto/create-frontpage.dto';
import { IngestionService } from 'src/ingestion/ingestion.service';
import { getCurrentDate } from 'src/utils/date.utils';
@Injectable()
export class FrontPageService {
  constructor(
    private prisma: PrismaService,
    private ingestionService: IngestionService,
  ) {}

  async getTodaysFrontpage() {
    const existing = await this.prisma.frontPage.findMany({
      where: { date: getCurrentDate() },
    });
    if (existing.length >= 3) {
      return existing; // already ingested today
    }
    return this.ingestionService.runDailyIngestion(); // first visit today,
  }

  async getFrontPageById(id: string) {
    return this.prisma.frontPage.findUnique({ where: { id } });
  }

  async createFrontPage(dto: CreateFrontPageDto) {
    return this.prisma.frontPage.create({ data: dto });
  }
}
