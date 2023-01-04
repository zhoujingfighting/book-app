import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  // Create a user
  signin() {
    return { msg: 'This is signed in!' };
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
        select: {
          // choose what to sed to frontend
          email: true,
        },
      });
      return user;
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
}
