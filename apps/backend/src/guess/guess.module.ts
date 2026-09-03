import { Module } from '@nestjs/common';
import { GuessController } from './guess.controller';
import { GuessService } from './guess.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GuessController],
  providers: [GuessService],
})
export class GuessModule {}
