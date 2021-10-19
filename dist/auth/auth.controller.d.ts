import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: RegisterDto): Promise<import("./entities/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        expiresIn: number;
        token: string;
    }>;
}
