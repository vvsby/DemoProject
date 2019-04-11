import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey('_Not_For_Production_Valid_Until_15_June_2019__MTU2MDU1MzIwMDAwMA==4b46920f094749677e70a024c9dc9415');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
