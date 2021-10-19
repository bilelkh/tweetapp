import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './dto/';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(register: RegisterDto): Promise<User> {
    const result = await this.userService.create(register);

    delete result.password;

    return result;
  }

  // todo: return type
  async login(loginData: LoginDto) {
    const user = await this.userService.findOneByEmail(loginData.email);
    if (!user) {
      throw new UnauthorizedException(
        `User with ${loginData.email} does not exist`,
        'unknown_user',
      );
    }
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        loginData.password,
        user.password,
      );
      if (isPasswordCorrect) {
        const accessToken = this.jwtService.sign({
          id: user.id,
          email: user.email,
        });
        return {
          expiresIn: this.configService.jwtExpiresIn,
          token: accessToken,
        };
      } else {
        throw new UnauthorizedException('Incorrect password.');
      }
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
