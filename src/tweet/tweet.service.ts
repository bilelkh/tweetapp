import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private contactRepository: Repository<Tweet>,
  ) {}
  async findAll(): Promise<Tweet[]> {
    return await this.contactRepository.find();
  }

  async create(tweet): Promise<Tweet> {
    return await this.contactRepository.save(tweet);
  }

  async update(id, tweet): Promise<UpdateResult> {
    return await this.contactRepository.update(id, tweet);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.contactRepository.delete(id);
  }

  async findOne(id): Promise<Tweet> {
    return await this.contactRepository.findOne(id);
  }
}
