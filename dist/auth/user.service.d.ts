import { Repository } from 'typeorm';
import { RegisterDto } from './dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(userData: RegisterDto): Promise<User>;
    findOneByEmail(email: string): Promise<User | undefined>;
}
