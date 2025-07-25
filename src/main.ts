import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//import { provideHttpClient } from '@angular/common/http';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { provideAnimations } from '@angular/platform-browser/animations';

ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
  ],
  ...appConfig
})
  .catch((err) => console.error(err));
