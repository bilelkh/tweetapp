"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const config_service_1 = require("../config/config.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(register) {
        const result = await this.userService.create(register);
        delete result.password;
        return result;
    }
    async login(loginData) {
        const user = await this.userService.findOneByEmail(loginData.email);
        if (!user) {
            throw new common_1.UnauthorizedException(`User with ${loginData.email} does not exist`, 'unknown_user');
        }
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(loginData.password, user.password);
            if (isPasswordCorrect) {
                const accessToken = this.jwtService.sign({
                    id: user.id,
                    email: user.email,
                });
                return {
                    expiresIn: this.configService.jwtExpiresIn,
                    token: accessToken,
                };
            }
            else {
                throw new common_1.UnauthorizedException('Incorrect password.');
            }
        }
    }
    async validateUser(payload) {
        return await this.userService.findOneByEmail(payload.email);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_service_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map