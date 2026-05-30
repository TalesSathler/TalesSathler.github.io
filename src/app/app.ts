import { Component, AfterViewInit, OnDestroy, HostListener, NgZone, inject, ChangeDetectorRef } from '@angular/core';
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
export class App implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  currentYear = new Date().getFullYear();
  menuOpen = false;
  activeSection = 'skills';

  private scrollListener?: () => void;
  private resizeListener?: () => void;

  readonly navLinks = [
    { href: '#skills',     label: 'Skills' },
    { href: '#projects',   label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#education',  label: 'Education' },
    { href: '#contact',    label: 'Contact' },
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.menuOpen = false;
  }

  ngAfterViewInit() {
    // Load Credly badge script
    const script = document.createElement('script');
    script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Setup scroll and resize listeners outside Angular zone for max performance
    this.scrollListener = () => this.updateActiveSection();
    this.resizeListener = () => this.updateActiveSection();

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.scrollListener!, { passive: true });
      window.addEventListener('resize', this.resizeListener!, { passive: true });
    });

    // Initial check (deferred to prevent ExpressionChangedAfterItHasBeenCheckedError)
    setTimeout(() => {
      this.updateActiveSection();
    });

    // Scroll-triggered reveal
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.zone.run(() => {
              entry.target.classList.add('revealed');
            });
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private updateActiveSection() {
    const sectionIds = this.navLinks.map(l => l.href.slice(1));
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // 1. If we are near the bottom of the page, highlight the last section
    if (scrollPosition + windowHeight >= docHeight - 80) {
      const lastId = sectionIds[sectionIds.length - 1];
      if (this.activeSection !== lastId) {
        this.zone.run(() => {
          this.activeSection = lastId;
          this.cdr.markForCheck();
        });
      }
      return;
    }

    // 2. Find the active section based on scroll position
    const triggerOffset = 160; // Offset for sticky navbar + spacing
    let currentActive = 'skills';

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerOffset) {
          currentActive = id;
        }
      }
    }

    if (this.activeSection !== currentActive) {
      this.zone.run(() => {
        this.activeSection = currentActive;
        this.cdr.markForCheck();
      });
    }
  }
}
