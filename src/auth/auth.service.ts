import { Injectable, Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  // Create a user
  signin() {
    return { msg: 'This is signed in!' };
  }
  signup(body: AuthDto) {
    return { msg: 'This is signed up!' };
  }
}
