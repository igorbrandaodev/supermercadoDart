import { Component, Inject, HostListener, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class EdicaoProdutoService {

    constructor(private http: HttpClient) {}

    // Solicita a API a atualização do Produto
    putProduto(produto: Produto) {

        // Define o cabeçalho da chamada
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }

        // Converte para JSON o objeto Produto
        let body = JSON.stringify(produto);

        // Chama a API enviando os parâmetros
        return this.http.put(environment.ApiUrl + `/Produtos/${produto.id}`, body, { headers: httpOptions.headers, observe: "response" });
    }

}


