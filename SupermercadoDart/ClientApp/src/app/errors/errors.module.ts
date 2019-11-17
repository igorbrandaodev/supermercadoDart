import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

@NgModule({
    declarations: [
        NotFoundComponent,
        NotAuthorizedComponent
    ],
    imports: [
        CommonModule, 
        RouterModule
    ],
    exports: []
})
export class ErrorsModule { }
