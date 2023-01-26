import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JWtStategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log(payload);
    //{ sub: 1, email: '254644528@qq.com', iat: 1674740773, exp: 1674741673 }
    // this is like express pipeline
    // the validation result will be used by http request
    // for example: if here return a singer string
    // the /users/me get request will see the user: `string`
    return payload;
  }
}
