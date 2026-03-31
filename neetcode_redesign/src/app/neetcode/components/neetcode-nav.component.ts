import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-neetcode-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" [ngClass]="navClass">
      <div class="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        <span class="text-xl font-bold tracking-tight cursor-pointer"
              [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">
          <span class="hero-gradient-text">Neet</span>Code
        </span>

        <div class="hidden md:flex items-center gap-8">
          <a *ngFor="let link of navLinks" href="#"
             class="text-sm font-medium transition-colors duration-300"
             [ngClass]="dark ? 'text-[#71717a] hover:text-[#e4e4e7]' : 'text-[#52525b] hover:text-[#09090b]'">
            {{ link }}
          </a>
        </div>

        <div class="flex items-center gap-3">
          <a href="https://discord.gg/neetcode" target="_blank" rel="noopener"
             class="hidden md:flex w-9 h-9 rounded-full items-center justify-center transition-all duration-300"
             [ngClass]="dark ? 'text-[#3f3f46] hover:text-[#5865F2] hover:bg-white/[0.04]' : 'text-[#a1a1aa] hover:text-[#5865F2] hover:bg-black/[0.03]'"
             aria-label="Join Discord">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>
          </a>
          <button (click)="toggleThemeRequested.emit()"
                  class="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300"
                  [ngClass]="dark ? 'text-[#71717a] hover:text-[#e4e4e7] hover:bg-white/[0.06]' : 'text-[#52525b] hover:text-[#09090b] hover:bg-black/[0.04]'">
            <svg *ngIf="dark" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>
            <svg *ngIf="!dark" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>
          </button>
          <a href="#"
             class="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
             [ngClass]="dark ? 'bg-white/[0.06] text-[#e4e4e7] hover:bg-white/[0.1] border border-white/[0.06]' : 'bg-[#09090b] text-white hover:bg-[#09090b]/90'">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  `,
})
export class NeetcodeNavComponent {
  @Input() dark = true;
  @Input() navClass = 'bg-transparent';
  @Input() navLinks: string[] = [];
  @Output() toggleThemeRequested = new EventEmitter<void>();
}
