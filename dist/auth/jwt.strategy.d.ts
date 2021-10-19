import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/config.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<any>;
}
export {};
