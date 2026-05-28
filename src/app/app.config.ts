import { ApplicationConfig } from '@angular/core';
import { provideZard } from './shared/core/provider/providezard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZard(),
  ],
};
