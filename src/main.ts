import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from 'environments/environment';

console.log("Environment is: ",environment);
if (environment.production) {
  enableProdMode();
  console.log("Environment is: ",environment);
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
