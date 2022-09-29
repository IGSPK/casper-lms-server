import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    async validate(payload: any) {
        return payload;
    }
}
export const jwtConstants = {
    secret: 'secretKey',
};

export class JwtAuthGuard extends AuthGuard('jwt') { }
