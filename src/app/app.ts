import { Component } from '@angular/core';
import { ZardAvatarComponent } from './shared/components/avatar';
import { ZardBadgeComponent } from './shared/components/badge';
import { ZardButtonComponent } from './shared/components/button';
import { ZardCardComponent } from './shared/components/card';

@Component({
  selector: 'app-root',
  imports: [
    ZardAvatarComponent,
    ZardBadgeComponent,
    ZardButtonComponent,
    ZardCardComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  currentYear = new Date().getFullYear();
}
