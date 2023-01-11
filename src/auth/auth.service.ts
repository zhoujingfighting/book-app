import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  // Create a user
  async signin(input: AuthDto) {
    // 1: find the user by email

    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    // if user does not exits throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    // compare password
    const pwMatches = await argon2.verify(user.hash, input.password);
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return this.signToken(user.id, user.email);
  }
  async signup(body: AuthDto) {
    // First step : create hash password
    const hash = await argon2.hash(body.password);
    // Second step : create user
    // Need to catch error when signup process comes some errors
    try {
      const user = await this.prisma.user.create({
        data: {
          hash,
          email: body.email,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential only');
          // Check ForbiddenException meaning
        }
      }
      throw error;
    }

    // Third step : return created user
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payLoad = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '15m', // the user can do anything in 15 minutes
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
