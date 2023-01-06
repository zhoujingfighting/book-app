import { Body, Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: AuthDto) {
    // What if user forgot to input email or password?
    // Use nestjs validator
    console.log(body);
    return await this.authService.signup(body);
  }

  @Post('signin')
  login(@Body() body: AuthDto) {
    return this.authService.signin(body);
  }
}
