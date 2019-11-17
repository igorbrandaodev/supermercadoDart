import { Component } from '@angular/core';
import { TokenService } from '../core/token/token.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

    constructor(
        private tokenService: TokenService
    ) { }

    isExpanded = false;

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    logout() {
        this.tokenService.deleteToken();
    }
}
