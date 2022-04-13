import { BcryptService } from './bcrypt.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { User } from '../../user/models/User';
import { TokenProps } from '../models/TokenProps';

@Injectable()
export class AuthService {
    constructor(
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async validateUser(userEmail: string, userPassword: string): Promise<any> {
        const user = await this.userService.getUserByEmail(userEmail);
        if (user && this.bcryptService.check(userPassword, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }

    async refresh(token: string) {
        try {
            const tokenDecode = (await this.jwtService.verifyAsync(
                token
            )) as TokenProps;
            const payload = { email: tokenDecode.email, sub: tokenDecode.sub };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
        }
    }

    async signup(user: User) {
        user.password = await this.bcryptService.set(user.password);
        return this.userService.createUser(user);
    }
}
