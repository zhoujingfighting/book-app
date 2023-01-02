import { Injectable, Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  // Create a user
  signin() {
    return { msg: 'This is signed in!' };
  }
  signup() {
    return { msg: 'This is signed up!' };
  }
}
