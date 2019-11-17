import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroProduto } from './cadastro/cadastro-produto.component';
import { Produto } from '../models/produto';
import { EdicaoProduto } from './edicao/edicao-produto.component';
import { ProdutoService } from './produtos.service';
import { DetalhesProduto } from './detalhes/detalhes-produto.component';
import { ExclusaoProduto } from './exclusao/exclusao-produto.component';

@Component({
    selector: 'produtos',
    templateUrl: './produtos.component.html'
})

export class ProdutosComponent implements OnInit{

    // Exporta para os componentes filhos as informações da grid
    InputProduto: Produto;

    // Instancia os componentes filhos
    @ViewChild(CadastroProduto) cadastro: CadastroProduto;
    @ViewChild(EdicaoProduto) edicao: EdicaoProduto;
    @ViewChild(DetalhesProduto) detalhes: DetalhesProduto;
    @ViewChild(ExclusaoProduto) exclusao: ExclusaoProduto;

    // Cria a lista de produtos que será exibida
    public produtos: Produto[];

    // Importa o serviço responsável pelas chamadas a api
    constructor(
        private ProdutoService: ProdutoService) {
    }

    // Dispara ao iniciar o componente
    ngOnInit(): void {
        // Controle de acesso


        this.BuscarProdutos();
    }

    // Busca dados na base
    public BuscarProdutos() {
        this.ProdutoService.getProdutos().subscribe(result => {

            // Preenche a lista de produtos
            if (result != null) {
              this.produtos = result;
            }

        }, error => console.error(error));;
    }

    // Cadastro
    public CadastrarProduto() {
        this.cadastro.abrirModal();
    }

    // Edição
    public EditarProduto(produto: Produto) {
        this.InputProduto = produto;
        this.edicao.abrirModal();
    }

    // Detalhes
    public VisualizarProduto(produto: Produto) {
        this.InputProduto = produto;
        this.detalhes.abrirModal();
    }

    // Exclusão
    public ExcluirProduto(produto: Produto) {
        this.InputProduto = produto;
        this.exclusao.abrirModal();
    }



}




