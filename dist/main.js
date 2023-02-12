"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const corsOptions = { optionsSuccessStatus: 200, Credential: true, origin: 'https://noblog.onrender.com', };
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    app.enableCors(corsOptions);
    await app.listen(4190);
}
bootstrap();
//# sourceMappingURL=main.js.map