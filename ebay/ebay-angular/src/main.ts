import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/componentes/zonaTienda/layoutComponent/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
