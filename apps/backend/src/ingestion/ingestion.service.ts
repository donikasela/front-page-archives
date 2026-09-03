import { Injectable } from '@nestjs/common';
import { FrontPageService } from 'src/frontpage/frontpage.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getCurrentDate } from 'src/utils/date.utils';

@Injectable()
export class IngestionService {
  constructor(private prisma: PrismaService) {}

  async fetchFrontPages() {
    try {
      const response = await fetch(
        'https://www.loc.gov/collections/chronicling-america/?front_pages_only=true&fo=json',
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Fetch operation failed:', error);
      throw error;
    }
  }

  mapResultToFrontPageDto(result: any) {
    return {
      sourceId: result.id,
      imageUrl: result.image_url[result.image_url.length - 1],
      newspaperTitle: result.item.newspaper_title[0],
      region: result.location_state[0],
      actualDate: new Date(result.date),
    };
  }

  async runDailyIngestion() {
    const rawResults = await this.fetchFrontPages();
    if (!rawResults || rawResults.length < 3) {
      throw new Error('Not enough front pages available');
    }

    const uniqueResults = new Set<number>();
    while (uniqueResults.size < 3) {
      const randomResults = Math.floor(Math.random() * rawResults.length);
      uniqueResults.add(randomResults);
    }

    const selectedResults = Array.from(uniqueResults).map(
      (index) => rawResults[index],
    );

    const cleanResults = selectedResults.map((result) => ({
      ...this.mapResultToFrontPageDto(result),
      date: getCurrentDate(),
    }));
    const savedResults = await Promise.all(
      cleanResults.map((result) =>
        this.prisma.frontPage.create({
          data: result,
        }),
      ),
    );
    return savedResults;
  }
}
