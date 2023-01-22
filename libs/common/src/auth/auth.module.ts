import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { RmqModule } from "../rabbitMQ/rmq.module";
import { AUTH_SERVICE } from "./services";

@Module({
    imports: [RmqModule.register( { name: AUTH_SERVICE } )],
    exports: [RmqModule]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
}