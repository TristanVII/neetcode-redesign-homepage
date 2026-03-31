import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { CompanyLogo } from '../neetcode.content';

@Component({
  selector: 'app-neetcode-trusted-by',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section class="relative py-14 transition-colors duration-500" [ngClass]="dark ? 'bg-[#08090a]' : 'bg-white'">
      <div class="max-w-5xl mx-auto px-6 md:px-8">
        <div class="border-t border-b py-10 transition-colors duration-300" [ngClass]="dark ? 'border-white/[0.04]' : 'border-black/[0.04]'">
          <p appAnimateOnScroll class="text-center text-xs uppercase tracking-[0.2em] mb-8 opacity-0 [&.is-visible]:animate-fade-in" [ngClass]="dark ? 'text-[#3f3f46]' : 'text-[#a1a1aa]'">Loved by engineers at</p>
          <div appAnimateOnScroll [animationDelay]="100" class="flex flex-wrap items-center justify-center gap-10 md:gap-14 opacity-0 [&.is-visible]:animate-fade-in">
            <img *ngFor="let logo of logos" [src]="logo.src" [alt]="logo.name" class="h-5 md:h-6 object-contain transition-opacity duration-300" [ngClass]="dark ? 'brightness-0 invert opacity-[0.3] hover:opacity-50' : 'opacity-[0.35] hover:opacity-60'">
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NeetcodeTrustedByComponent {
  @Input() dark = true;
  @Input() logos: CompanyLogo[] = [];
}
