import { IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateGuessDto {
  @IsUUID()
  frontPageId: string;

  @IsInt()
  @Min(1700)
  @Max(2026)
  guessedYear: number;
}
