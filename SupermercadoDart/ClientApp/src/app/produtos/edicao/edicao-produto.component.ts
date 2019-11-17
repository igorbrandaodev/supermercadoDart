import { Component, Inject, HostListener, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { EdicaoProdutoService } from './edicao-produto.service';
import { ToastrService } from 'ngx-toastr';


declare var $: any;

@Component({
    selector: 'edicao-produto',
    templateUrl: './edicao-produto.component.html'
})


export class EdicaoProduto implements OnInit{

    // Recebe os dados do componente pai
    @Input() produto: Produto;

    // Avisa o componente pai que um registro foi editado
    @Output() atualizarGrid = new EventEmitter<string>();

    // Instancia um formulário
    formEditar: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private EdicaoProdutoService: EdicaoProdutoService,
        private toastr: ToastrService
    ) { }

    // Dispara ao iniciar o componente
    ngOnInit(): void {
        this.formEditar = this.formBuilder.group({
            id: ['', [Validators.required]],
            dataCadastro: ['', [Validators.required]],
            dataAtualizacao: [''],

            descricao: ['', [Validators.required]],
            preco: ['', [Validators.required]],
            estoque: ['', [Validators.required]],

        });
    }

    // Exibe o modal
    public abrirModal() {
        $('#modalEditar').modal('show');
    }

    // Oculta o modal
    public fecharModal() {
        $('#modalEditar').modal('hide');
    }

    // Preenche o formulário quando o objeto do componente pai chegar
    ngOnChanges(changes: SimpleChanges): void {
        if (this.produto != undefined) {
            this.setarCampos();
        }
    }

    // Preenche os campos do formulário e os desabilita
    setarCampos() {
        this.formEditar.get('id').setValue(this.produto.id);
        this.formEditar.get('dataCadastro').setValue(this.produto.dataCadastro);
        this.formEditar.get('dataAtualizacao').setValue(this.produto.dataAtualizacao);
        this.formEditar.get('descricao').setValue(this.produto.descricao);
        this.formEditar.get('preco').setValue(this.produto.preco);
        this.formEditar.get('estoque').setValue(this.produto.estoque);
    }


    // Atualiza o produto no banco de dados
    public editarProduto(event: FormGroup) {

        // Cria um objeto Produto e o preenche com os dados do formulário
        let produto: Produto;
        produto = event.getRawValue();

        // Define a data em que está ocorrendo a atualização
        produto.dataAtualizacao = new Date();

        // Envia os dados para o serviço chamar a API
        this.EdicaoProdutoService
            .putProduto(produto)
            .subscribe((response) => {

                // Obtém a resposta
                let httpResponse = response;

                // Retorna ao usuário o resultado do processamento
                if (httpResponse.status == 400 || httpResponse.status == 401) {
                    this.toastr.error('Não foi possível editar o produto! Tente novamente em instantes.');
                } else if (httpResponse.status == 500) {
                    this.toastr.error('Falha na comunicação com o servidor! Tente novamente em instantes.');
                } else {
                    this.toastr.success('Produto editado com sucesso!');

                     // Fecha o modal e avisa o componente pai para atualizar a grid
                    this.fecharModal();
                    this.atualizarGrid.next();
                }
            }, (error) => {
                console.log(error)
                    this.toastr.error('Erro! Não foi possível editar o produto.');
            });

        console.log('teste');
    }


}


