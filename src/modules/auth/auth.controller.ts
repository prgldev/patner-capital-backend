import { Controller, Request, Post, UseGuards, Body, Query } from '@nestjs/common';
import { AllowAny } from 'src/custom-decorators/allow-any.decorator';
import { User } from '../user/models/User';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('login')
    @AllowAny()
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post('refresh')
    @AllowAny()
    async refreshToken(@Query('token') token: string ) {
        const tokenToRefresh = token;
        return this.authService.refresh(tokenToRefresh);
    }

    @Post('signup')
    async signup(@Body() user: User) {
        return this.authService.signup(user);
    }
}
