import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';

import { Ng2MdDataTableModule } from './ng2-md-data-table/ng2-md-data-table';

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        Ng2MdDataTableModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
