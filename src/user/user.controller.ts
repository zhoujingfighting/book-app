import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  // the 'jwt' strategy comes from auth/strategy.ts
  @Get('me')
  getme(@Req() req: Request) {
    console.log((req as any).user);
    return 'user info';
  }
}
