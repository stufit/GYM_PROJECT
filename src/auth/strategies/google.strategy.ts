import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { IOGoogleAuthUser } from '../interface/social.interface';
import { Injectable } from '@nestjs/common';
import * as process from 'process';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }
  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): IOGoogleAuthUser {
    return {
      name: profile.displayName,
      email: profile.emails[0].value,
      hashedPassword: 'sadfsadf',
      age: 0,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
