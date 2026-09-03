import { IsString, IsUrl, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateFrontPageDto {
  @IsString()
  @IsNotEmpty()
  sourceId: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  newspaperTitle: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsDateString()
  date: string;

  @IsDateString()
  actualDate: string;
}
