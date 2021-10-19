export interface EnvConfig {
    [key: string]: string;
}
export declare class ConfigService {
    private readonly envConfig;
    private readonly logger;
    constructor();
    private validateInput;
    get appPort(): string;
    get jwtSecret(): string;
    get jwtExpiresIn(): number;
    get databaseHost(): string;
    get databaseName(): string;
    get databaseUsername(): string;
    get databasePassword(): string;
    get databasePort(): number;
    get databaseSyncronize(): boolean;
}
