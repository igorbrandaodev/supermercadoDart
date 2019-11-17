import { Component, Inject, HostListener, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../models/produto';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class ProdutoService {

    constructor(private http: HttpClient) { }

    // Busca na api a lista de produtos
    getProdutos() {
        return this.http.get<Produto[]>(environment.ApiUrl + '/Produtos/');
    }

}


