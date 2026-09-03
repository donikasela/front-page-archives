import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FrontPageService } from './frontpage.service';
import { CreateFrontPageDto } from './dto/create-frontpage.dto';

@Controller('frontpage')
export class FrontPageController {
  constructor(private frontPageService: FrontPageService) {}

  @Get()
  getFrontPage() {
    return this.frontPageService.getTodaysFrontpage();
  }

  @Get(':id')
  getFrontPageById(@Param('id') id: string) {
    return this.frontPageService.getFrontPageById(id);
  }

  @Post()
  createFrontPage(@Body() dto: CreateFrontPageDto) {
    return this.frontPageService.createFrontPage(dto);
  }
}
