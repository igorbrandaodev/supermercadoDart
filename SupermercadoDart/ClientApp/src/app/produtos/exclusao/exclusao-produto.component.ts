import { Component, Inject, HostListener, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { ExclusaoProdutoService } from './exclusao-produto.service';
import { ToastrService } from 'ngx-toastr';


declare var $: any;

@Component({
    selector: 'exclusao-produto',
    templateUrl: './exclusao-produto.component.html'
})


export class ExclusaoProduto implements OnInit{

    // Recebe os dados do componente pai
    @Input() produto: Produto;

    // Avisa o componente pai que um registro foi editado
    @Output() atualizarGrid = new EventEmitter<string>();

    // Instancia um formulário
    formExcluir: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private ExclusaoProdutoService: ExclusaoProdutoService,
        private toastr: ToastrService
    ) { }

    // Dispara ao iniciar o componente
    ngOnInit(): void {
        this.formExcluir = this.formBuilder.group({
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
        $('#modalExcluir').modal('show');
    }

    // Oculta o modal
    public fecharModal() {
        $('#modalExcluir').modal('hide');
    }

    // Preenche o formulário quando o objeto do componente pai chegar
    ngOnChanges(changes: SimpleChanges): void {
        if (this.produto != undefined) {
            this.setarCampos();
        }
    }

    // Preenche os campos do formulário e os desabilita
    setarCampos() {
        this.formExcluir.get('id').setValue(this.produto.id);
        this.formExcluir.get('id').disable();
        this.formExcluir.get('dataCadastro').setValue(this.produto.dataCadastro);
        this.formExcluir.get('dataCadastro').disable();
        this.formExcluir.get('dataAtualizacao').setValue(this.produto.dataAtualizacao);
        this.formExcluir.get('dataAtualizacao').disable();

        this.formExcluir.get('descricao').setValue(this.produto.descricao);
        this.formExcluir.get('descricao').disable();
        this.formExcluir.get('preco').setValue(this.produto.preco);
        this.formExcluir.get('preco').disable();
        this.formExcluir.get('estoque').setValue(this.produto.estoque);
        this.formExcluir.get('estoque').disable();

    }

    // Exclui o produto no banco de dados
    public excluirProduto(event: FormGroup) {

        // Cria um objeto Produto e o preenche com os dados do formulário
        let produto: Produto;
        produto = event.getRawValue();

        // Envia os dados para o serviço chamar a API
        this.ExclusaoProdutoService
            .deleteProduto(produto)
            .subscribe((response) => {

                // Obtém a resposta
                let httpResponse = response;

                // Retorna ao usuário o resultado do processamento
                if (httpResponse.status == 400 || httpResponse.status == 401) {
                    this.toastr.error('Não foi possível excluir o produto! Tente novamente em instantes.');
                } else if (httpResponse.status == 500) {
                    this.toastr.error('Falha na comunicação com o servidor! Tente novamente em instantes.');
                } else {
                    this.toastr.success('Produto excluido com sucesso!');

                    // Fecha o modal e avisa o componente pai para atualizar a grid
                    this.fecharModal();
                    this.atualizarGrid.next();
                }
            }, (error) => {
                console.log(error)
                    this.toastr.error('Erro! Não foi possível excluir o produto.');
            });

        console.log('teste');
    }

    


}


