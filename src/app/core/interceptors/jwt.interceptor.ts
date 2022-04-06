import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    constructor(private _auth: AuthService) {}

    /**
     * intercept token expired
     *
     * @param request
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const jwt = this._auth.jwt;
        let newReq: HttpRequest<any>;
        if (jwt) {
            newReq = req.clone({
                setHeaders: {
                    Authorization: jwt,
                },
            });
        }

        return next.handle(jwt ? newReq : req);
    }
}
