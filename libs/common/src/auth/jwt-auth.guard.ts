import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, Observable, tap } from "rxjs";
import { AUTH_SERVICE } from "./services";

@Injectable()
export class JWTAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const auth = this.getAuth(context);
        return this.authClient.send('validate_user', { Authentication: auth }).pipe(
            tap(res => {
                this.addUser(res, context)
            }),
            catchError(() => {
                throw new UnauthorizedException();
            })
        )
    }

    private getAuth(context: ExecutionContext) {
        let auth: string;
        if(context.getType() === 'rpc') {
            auth = context.switchToRpc().getData().Authentication;
        } else if(context.getType() === 'http') {
            auth = context.switchToHttp().getRequest().cookies?.Authentication;
        }

        if(!auth) {
            throw new UnauthorizedException('no value was provided for authentication');
        }

        return auth;
    }


    private addUser(user: any, context: ExecutionContext) {
        if(context.getType() === 'rpc') {
            context.switchToRpc().getData().user = user;
        } else if(context.getType() === 'http') {
            context.switchToHttp().getRequest().user = user;
        }
    }
}