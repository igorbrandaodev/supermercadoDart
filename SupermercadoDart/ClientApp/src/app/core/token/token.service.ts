import { Injectable } from '@angular/core';

const KEY = 'authToken';
const refreshToken = 'refreshToken';

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	constructor() { }

	setToken(token: string) {
		window.localStorage.setItem(KEY, token);
	}

	setRefereshToken(refresh: string){
		window.localStorage.setItem(refreshToken, refresh);
	}

	getRefreshToken(){
		return window.localStorage.getItem(refreshToken);
	}

	getToken() {
		return window.localStorage.getItem(KEY);
	}

	deleteToken() {
		window.localStorage.removeItem(KEY);
	}

	hasToken() {
		return !!this.getToken();
	}
}
