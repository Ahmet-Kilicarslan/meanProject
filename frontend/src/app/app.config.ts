import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection,provideAppInitializer,inject} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import UserService from './services/UserService'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      const userService = inject(UserService);
      return userService.initializeAuth();
    })
  ]
};
