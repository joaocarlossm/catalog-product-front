import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../src/app/app.routes';
import { AuthService } from '../src/app/services/auth.service';
import { AuthInterceptor } from '../src/app/interceptors/auth.interceptor';
import { inject } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([
      (req, next) => AuthInterceptor(inject(AuthService), inject(Router))(req, next)
    ])),
    provideAnimations(),
    provideRouter(routes),
    AuthService, provideIonicAngular({})
  ]
}).catch(err => console.error(err));
