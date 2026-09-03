import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FrontPageModule } from './frontpage/frontpage.module';
import { ConfigModule } from '@nestjs/config';
import { GuessModule } from './guess/guess.module';
import { IngestionModule } from './ingestion/ingestion.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    FrontPageModule,
    GuessModule,
    IngestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
