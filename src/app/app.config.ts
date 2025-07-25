import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  provideStore(), provideHttpClient(), provideEffects(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
};
