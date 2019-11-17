import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { ResponseModel } from '../../models/response';
import { environment } from 'src/environments/environment';

const URL_API = environment.ApiUrl;

// Define o cabeçalho da chamada
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    

    // Faz uma requisição para a API enviando os dados
    autenticacao(userID: string, accessKey: string) {
        return this.http
            .post(URL_API + '/login',
                { userID, accessKey, grantType: 'password' },
                { headers: httpOptions.headers, observe: "response" })
            .pipe(tap(res => {

                let responseModel = (<ResponseModel>res.body.valueOf());

                // Obtém o retorno
                if (responseModel.autenticated != false) {

                    // Salva o token
                    this.userService.setToken(responseModel.accessToken);
                    this.userService.setRefreshToken(responseModel.refreshToken);
                }
            }));
    }


}
