import { Injectable, Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';

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
    const user = await this.prisma.user.create({
      data: {
        hash,
        email: body.email,
      },
      select: {
        email: true,
      },
    });
    // Third step : return created user
    return user;
  }
}
