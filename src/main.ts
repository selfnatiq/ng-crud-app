import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@swisscom/sdx/dist/js/webcomponents/loader';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

defineCustomElements();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
