import { ConfigService } from '@nestjs/config/dist';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient {
    private config;
    constructor(config: ConfigService);
}
