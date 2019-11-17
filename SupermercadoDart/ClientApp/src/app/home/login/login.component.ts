import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/models/user';
import { ResponseModel } from 'src/app/models/response';
import { ToastrService } from 'ngx-toastr';

declare let Materialize: any;

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    user: User;
    @ViewChild('userIDInput') userIDInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private render: Renderer,
        private toastr: ToastrService
    ) { }

    // Dispara ao iniciar o componente
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userID: ['',
                [
                    Validators.required,
                    Validators.pattern(/^[a-z-_.]+@+[a-z-]+\.[a-z]+\.?([a-z]+)?$/)
                ]
            ],
            accessKey: ['', Validators.required]
        })
    }

    // Realiza a autenticação
    login() {

        // Obtém usuário e senha informados
        const userID = this.loginForm.get('userID').value;
        const accessKey = this.loginForm.get('accessKey').value;

        // Tenta realizar a autenticação
        this.authService
            .autenticacao(userID, accessKey)
            .subscribe((response) => {

                // Obtém o retorno
                let responseModel = (<ResponseModel>response.body.valueOf());

                // Define o caminho a ser percorrido
                if (responseModel.message == 'Failed to autheticate') {
                    this.toastr.error('Erro de autenticação, usuário ou senha inválidos.');
                }

                if (responseModel.message == 'OK') {
                    this.router.navigate(['home'])
                }
            })
    }
}
