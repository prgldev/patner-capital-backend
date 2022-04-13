import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './modules/common/common.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppLoggerMiddleware } from './AppLoggerMiddleware';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';

@Module({
    imports: [
        AuthModule,
        CommonModule,
        UserModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.mw9dc.mongodb.net/DB_PARTNER_CAPITAL?retryWrites=true&w=majority`
        ),
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useFactory: (ref) => new JwtAuthGuard(ref),
            inject: [Reflector],
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
