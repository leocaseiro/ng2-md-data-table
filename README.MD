# ng2-md-data-table

> ATTENTION: This library is currently in development and is not ready to use in production

## Installation

To install this library, run:

```bash
$ npm install ng2-md-data-table --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng2-md-data-table
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { Ng2MdDataTableModule } from 'ng2-md-data-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Import Ng2MdDataTableModule
    Ng2MdDataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<ng2-md-data-table></ng2-md-data-table>
```

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [leocaseiro](mailto:leobok@gmail.com)

> Forked from [ng2-material](https://github.com/justindujardin/ng2-material) 
