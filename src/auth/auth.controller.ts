import { Body, Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: AuthDto) {
    // What if user forgot to input email or password?
    // Use nestjs validator
    console.log(body);
    return this.authService.signup();
  }

  @Post('signin')
  login() {
    return this.authService.signin();
  }
}
