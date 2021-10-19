import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
export declare class TweetService {
    private contactRepository;
    constructor(contactRepository: Repository<Tweet>);
    findAll(): Promise<Tweet[]>;
    create(tweet: any): Promise<Tweet>;
    update(id: any, tweet: any): Promise<UpdateResult>;
    delete(id: any): Promise<DeleteResult>;
    findOne(id: any): Promise<Tweet>;
}
