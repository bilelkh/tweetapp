import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
export declare class TweetController {
    private readonly tweetService;
    constructor(tweetService: TweetService);
    create(createTweetDto: CreateTweetDto): Promise<import("./entities/tweet.entity").Tweet>;
    findAll(): Promise<import("./entities/tweet.entity").Tweet[]>;
    findOne(id: string): Promise<import("./entities/tweet.entity").Tweet>;
    update(id: string, updateTweetDto: UpdateTweetDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
