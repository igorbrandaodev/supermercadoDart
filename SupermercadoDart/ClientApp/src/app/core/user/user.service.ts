import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { BehaviorSubject } from 'rxjs';

import { TokenService } from '../token/token.service';
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    private user: User;

    constructor(private tokenService: TokenService) {
        this.tokenService.hasToken() && this.decodeJWT();
     }

    setToken(token: string): void {
        this.tokenService.setToken(token);
        this.decodeJWT();
    }

    setRefreshToken(refresh: string){
        this.tokenService.setRefereshToken(refresh);
    }

    isLogged(): boolean {
        return this.tokenService.hasToken();
    }

    logout(){
        this.tokenService.deleteToken();
    }

    getUserObservable(){
        return this.userSubject.asObservable();
    }

    decodeJWT(){
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.user = user;
        this.userSubject.next(user);
    }

    getUser(): User{
        return this.user;
    }
}
