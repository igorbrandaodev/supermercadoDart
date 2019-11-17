import { Component, Inject, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { CadastroProdutoService } from './cadastro-produto.service';
import { ToastrService } from 'ngx-toastr';


declare var $: any;

@Component({
    selector: 'cadastro-produto',
    templateUrl: './cadastro-produto.component.html'
})


export class CadastroProduto implements OnInit {

    // Avisa o componente pai que um novo registro foi inserido
    @Output() atualizarGrid = new EventEmitter<string>();

    // Instancia um formulário
    formCadastrar: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private CadastroProdutoService: CadastroProdutoService,
        private toastr: ToastrService
    ) { }

    // Dispara ao iniciar o componente
    ngOnInit(): void {
        this.formCadastrar = this.formBuilder.group({
            descricao: ['', [Validators.required]],
            preco: ['', [Validators.required]],
            estoque: ['', [Validators.required]]
        });
    }

    // Exibe o modal
    public abrirModal() {
        $('#modalCadastrar').modal('show');
    }

    // Oculta o modal
    public fecharModal() {
        $('#modalCadastrar').modal('hide');
    }

    // Cadastra o produto no banco de dados
    public cadastrarProduto(event: FormGroup) {

        // Cria um objeto Produto e o preenche com os dados do formulário
        let produto: Produto;
        produto = event.getRawValue();

        // Define a data em que está ocorrendo o cadastro
        produto.dataCadastro = new Date();

        // Envia os dados para o serviço chamar a API
        this.CadastroProdutoService
            .postProduto(produto)
            .subscribe((response) => {

                // Obtém a resposta
                let httpResponse = response;

                // Retorna ao usuário o resultado do processamento
                if (httpResponse.status == 400 || httpResponse.status == 401) {
                    this.toastr.error('Não foi possível cadastrar o produto! Tente novamente em instantes.');
                } else if (httpResponse.status == 500) {
                    this.toastr.error('Falha na comunicação com o servidor! Tente novamente em instantes.');
                } else {
                    this.toastr.success('Produto cadastrado com sucesso!');

                    // Fecha o modal e avisa o componente pai para atualizar a grid
                    this.fecharModal();
                    this.atualizarGrid.next();
                }
            }, (error) => {
                console.log(error)
                this.toastr.error('Erro! Não foi possível cadastrar o produto.');
            });
    }

}


