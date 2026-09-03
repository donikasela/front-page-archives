import { Body, Controller, Post } from '@nestjs/common';
import { GuessService } from './guess.service';
import { CreateGuessDto } from './dto/create-guess.dto';

@Controller('guess')
export class GuessController {
  constructor(private guessService: GuessService) {}

  @Post()
  submitGuess(@Body() dto: CreateGuessDto) {
    return this.guessService.submitGuess(dto);
  }
}
