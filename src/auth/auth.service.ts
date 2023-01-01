import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signin() {
    return { msg: 'This is signed in!' };
  }
  signup() {
    return { msg: 'This is signed up!' };
  }
}
