"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
require("reflect-metadata");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('tweetAoo')
        .setDescription("The tweetAoo api's description")
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const PORT = process.env.PORT || 3000;
    console.log('===PORT===', PORT);
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map