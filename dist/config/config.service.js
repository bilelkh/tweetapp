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
var ConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
const fs = require("fs");
const Joi = require("joi");
const common_1 = require("@nestjs/common");
let ConfigService = ConfigService_1 = class ConfigService {
    constructor() {
        this.envConfig = {};
        this.logger = new common_1.Logger(ConfigService_1.name);
        let config;
        console.log('===process.env.NODE_ENV===', process.env.NODE_ENV);
        try {
            config = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`));
        }
        catch (error) {
            this.logger.error(`No ${process.env.NODE_ENV}.env file was found.`);
        }
        if (config) {
            this.envConfig = this.validateInput(config);
        }
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            DB_NAME: Joi.string().required(),
            DB_HOST: Joi.string().default('localhost'),
            DB_USERNAME: Joi.string().required(),
            DB_PASSWORD: Joi.string().required(),
            DB_PORT: Joi.number().default(5432),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRES_IN: Joi.number().default(30 * 24 * 60 * 60),
        });
        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get appPort() {
        return this.envConfig.APP_PORT;
    }
    get jwtSecret() {
        return this.envConfig.JWT_SECRET;
    }
    get jwtExpiresIn() {
        return Number(this.envConfig.JWT_EXPIRES_IN) || 30 * 24 * 60 * 60;
    }
    get databaseHost() {
        return this.envConfig.DB_HOST;
    }
    get databaseName() {
        return this.envConfig.DB_NAME;
    }
    get databaseUsername() {
        return this.envConfig.DB_USERNAME;
    }
    get databasePassword() {
        return this.envConfig.DB_PASSWORD;
    }
    get databasePort() {
        return Number(this.envConfig.DB_PORT);
    }
    get databaseSyncronize() {
        if (process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test') {
            return true;
        }
        else {
            return false;
        }
    }
};
ConfigService = ConfigService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map