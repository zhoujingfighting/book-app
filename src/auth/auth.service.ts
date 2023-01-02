import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';

@Injectable()
export class AuthService {
  signin() {
    return { msg: 'This is signed in!' };
  }
  signup() {
    return { msg: 'This is signed up!' };
  }
}
