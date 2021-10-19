import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { TweetService } from './tweet.service';
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Tweet')
@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.tweetService.findOne(+id);
    console.log('====resomt===', result);
    if (!result) throw new NotFoundException('tweet not found');
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    const result = await this.tweetService.findOne(+id);
    if (!result) throw new NotFoundException('tweet not found');

    return this.tweetService.update(+id, updateTweetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.tweetService.findOne(+id);
    if (!result) throw new NotFoundException('tweet not found');
    return this.tweetService.delete(+id);
  }
}
