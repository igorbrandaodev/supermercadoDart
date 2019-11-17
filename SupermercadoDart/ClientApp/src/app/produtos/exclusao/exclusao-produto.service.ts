import { Component, Inject, HostListener, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ExclusaoProdutoService {

    constructor(private http: HttpClient) {}

    // Solicita a API a exclusão do Produto
    deleteProduto(produto: Produto) {

        // Define o cabeçalho da chamada
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
     
        // Chama a API enviando o ID do produto na URL
        return this.http.delete(environment.ApiUrl + `/Produtos/${produto.id}`, { headers: httpOptions.headers, observe: "response" });
    }

}


