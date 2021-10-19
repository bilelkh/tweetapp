import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './dto/';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/config.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    register(register: RegisterDto): Promise<User>;
    login(loginData: LoginDto): Promise<{
        expiresIn: number;
        token: string;
    }>;
    validateUser(payload: JwtPayload): Promise<any>;
}
