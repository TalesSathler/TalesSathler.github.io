import { Component, AfterViewInit } from '@angular/core';
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
export class App implements AfterViewInit {
  currentYear = new Date().getFullYear();

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
