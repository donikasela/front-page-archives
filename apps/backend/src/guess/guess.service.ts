import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGuessDto } from './dto/create-guess.dto';

@Injectable()
export class GuessService {
  constructor(private prisma: PrismaService) {}

  async submitGuess(dto: CreateGuessDto) {
    const frontPage = await this.prisma.frontPage.findUnique({
      where: { id: dto.frontPageId },
    });

    if (!frontPage) {
      throw new NotFoundException('FrontPage not found');
    }

    const actualYear = frontPage.actualDate.getUTCFullYear();
    const distanceInYears = Math.abs(dto.guessedYear - actualYear);
    const points = this.calculatePoints(distanceInYears);
    const correct = distanceInYears === 0;

    const guess = await this.prisma.guess.create({
      data: {
        frontPageId: dto.frontPageId,
        guessedYear: dto.guessedYear,
        distanceInYears,
        points,
        correct,
      },
    });

    return {
      guessId: guess.id,
      guessedYear: guess.guessedYear,
      actualYear,
      distanceInYears,
      points,
      correct,
      newspaperTitle: frontPage.newspaperTitle,
      region: frontPage.region,
      imageUrl: frontPage.imageUrl,
    };
  }

  private calculatePoints(distance: number): number {
    if (distance === 0) return 5000;
    return Math.round(5000 * Math.exp(-distance / 10));
  }
}
