import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { CadastroProduto } from './produtos/cadastro/cadastro-produto.component';
import { EdicaoProduto } from './produtos/edicao/edicao-produto.component';
import { DetalhesProduto } from './produtos/detalhes/detalhes-produto.component';
import { RequestInterceptor } from './core/auth/request.interceptor';
import { ExclusaoProduto } from './produtos/exclusao/exclusao-produto.component';
import { LoginComponent } from './home/login/login.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NotAuthorizedComponent } from './errors/not-authorized/not-authorized.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        LoginComponent,
        HomeComponent,
        ProdutosComponent,
        CadastroProduto,
        EdicaoProduto,
        DetalhesProduto,
        ExclusaoProduto,
        NotFoundComponent,
        NotAuthorizedComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([
            { path: '', component: LoginComponent, pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'produtos', component: ProdutosComponent },
            { path: 'not-found', component: NotFoundComponent },
            { path: 'not-authorized', component: NotAuthorizedComponent },
            { path: '**',redirectTo: 'not-found'}
        ])
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
