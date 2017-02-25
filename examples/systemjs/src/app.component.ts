import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    hello: string = 'Hello World';

    constructor() {
    }

    ngOnInit() {

    }
}
