import { Component, Inject, HostListener, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { ToastrService } from 'ngx-toastr';


declare var $: any;

@Component({
    selector: 'detalhes-produto',
    templateUrl: './detalhes-produto.component.html'
})


export class DetalhesProduto implements OnInit{

    // Recebe os dados do componente pai
    @Input() produto: Produto;

    // Avisa o componente pai que um novo registro foi inserido
    @Output() atualizarGrid = new EventEmitter<string>();

    // Instancia um formulário
    formDetalhes: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) { }

    // Dispara ao iniciar o componente
    ngOnInit(): void {
        this.formDetalhes = this.formBuilder.group({
            id: ['', [Validators.required]],
            dataCadastro: [''],
            dataAtualizacao: [''],
            descricao: ['', [Validators.required]],
            preco: ['', [Validators.required]],
            estoque: ['', [Validators.required]],
        });
    }

    // Exibe o modal
    public abrirModal() {
        $('#modalDetalhes').modal('show');
    }

    // Oculta o modal
    public fecharModal() {
        $('#modalDetalhes').modal('hide');
    }

    // Preenche o formulário quando o objeto do componente pai chegar
    ngOnChanges(changes: SimpleChanges): void {
        if (this.produto != undefined) {
            this.setarCampos();
        }
    }

    // Preenche os campos do formulário e os desabilita
    setarCampos() {
        this.formDetalhes.get('id').setValue(this.produto.id);
        this.formDetalhes.get('id').disable();
        this.formDetalhes.get('dataCadastro').setValue(this.produto.dataCadastro);
        this.formDetalhes.get('dataCadastro').disable();
        this.formDetalhes.get('dataAtualizacao').setValue(this.produto.dataAtualizacao);
        this.formDetalhes.get('dataAtualizacao').disable();
        this.formDetalhes.get('descricao').setValue(this.produto.descricao);
        this.formDetalhes.get('descricao').disable();
        this.formDetalhes.get('preco').setValue(this.produto.preco);
        this.formDetalhes.get('preco').disable();
        this.formDetalhes.get('estoque').setValue(this.produto.estoque);
        this.formDetalhes.get('estoque').disable();
    }
}


