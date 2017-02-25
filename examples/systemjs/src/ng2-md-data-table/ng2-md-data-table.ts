import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '@angular/material';

import {
    Ng2MdDataTable,
    Ng2MdDataTableHeaderSelectableRow,
    Ng2MdDataTableSelectableRow
} from './data-table';

const NG2_DATA_TABLE_COMPONENTS = [
    Ng2MdDataTable,
    Ng2MdDataTableHeaderSelectableRow,
    Ng2MdDataTableSelectableRow
];

@NgModule({
    declarations: NG2_DATA_TABLE_COMPONENTS,
    exports: NG2_DATA_TABLE_COMPONENTS,
    imports: [
        BrowserModule,
        MaterialModule
    ]
})
export class Ng2MdDataTableModule {
}
