import { Component, OnInit } from '@angular/core';
import { TokenService } from '../core/token/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    constructor(
        private tokenService: TokenService,
        private router: Router,
    ) { }


    ngOnInit() {

        if (!this.tokenService.hasToken()) {
            this.router.navigate(['/not-authorized']);
            this.tokenService.deleteToken();
        }
    }
}
