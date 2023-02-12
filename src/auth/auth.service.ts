import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';


@Injectable()
export class AuthService {
    constructor(
      private prisma: PrismaService, 
      private jwt: JwtService, 
      private config: ConfigService
      ){}
    // login
    async login(dto: AuthDto){
      // find user
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        }
      })
      // if user does not exist throw exception
      if (!user) throw new ForbiddenException('User does not exist')

      // check password
      const passwordCheck = await argon.verify(user.password, dto.password)

      //  if password is incorrect throw exception
      if (!passwordCheck) throw new ForbiddenException('Incorrect password')
      // send back user
        return this.signToken(user.id, user.email);
    }

    // signup
    async signup(dto: AuthDto){
        // Generate the password hash
        const password = await argon.hash(dto.password);

        // Saves the new user in the DB
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password,
                },
                select: {
                    email: true
                }
            })
    
            // Return the saved user
            return user;
        } catch (error) {
            if (
              error instanceof
              PrismaClientKnownRequestError
            ) {
              if (error.code === 'P2002') {
                throw new ForbiddenException(
                  'Credentials taken',
                );
              }
            }
            throw error;
          }
        }

        // sign token
        async signToken(id: number, email: string): Promise<{ access_token: string }> {
          const payload = {
            sub: id,
            email
          }
          
          const jwtSecret = this.config.get('JWT_SECRET');

          const token = await this.jwt.signAsync(payload, {
            expiresIn: '50m',
            secret: jwtSecret
          })

          return {
            access_token: token,
          };

        }

}
