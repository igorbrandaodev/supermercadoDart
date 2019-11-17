import { Component, Inject, HostListener, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class CadastroProdutoService {

    constructor(private http: HttpClient) {}

    // Solicita a API a inserção do Produto
    postProduto(produto: Produto) {

        // Define o cabeçalho da chamada
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }

        // Converte para JSON o objeto Produto
        let body = JSON.stringify(produto);

        // Chama a API enviando os parâmetros
        return this.http.post(environment.ApiUrl + '/Produtos/', body, { headers: httpOptions.headers, observe: "response" });

    }

}


