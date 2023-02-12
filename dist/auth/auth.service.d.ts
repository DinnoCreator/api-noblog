import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    login(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signup(dto: AuthDto): Promise<{
        email: string;
    }>;
    signToken(id: number, email: string): Promise<{
        access_token: string;
    }>;
}
