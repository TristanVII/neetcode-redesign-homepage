import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-neetcode-cta',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section class="relative py-28 md:py-36 overflow-hidden transition-colors duration-500" [ngClass]="dark ? 'bg-[#0a0a0c]' : 'bg-[#fafafa]'">
      <div class="pointer-events-none absolute inset-0" [style.background]="dark ? 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 60%)' : 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.03) 0%, transparent 60%)'"></div>
      <div class="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        <div class="text-center">
          <h2 appAnimateOnScroll class="text-3xl md:text-5xl font-bold tracking-tight opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Start your journey <span class="hero-gradient-text">today</span></h2>
          <p appAnimateOnScroll [animationDelay]="80" class="mt-5 text-base opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#52525b]' : 'text-[#71717a]'">Stop grinding randomly. Start learning the patterns that actually matter.</p>
          <div appAnimateOnScroll [animationDelay]="200" class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 [&.is-visible]:animate-fade-up">
            <a href="#" class="cta-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-medium text-base">Get Started Free<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></a>
            <a href="https://discord.gg/neetcode" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-all duration-300" [ngClass]="dark ? 'border border-white/[0.06] text-[#a1a1aa] hover:border-[#5865F2]/40 hover:text-[#5865F2] hover:bg-[#5865F2]/[0.06]' : 'border border-black/[0.06] text-[#52525b] hover:border-[#5865F2]/30 hover:text-[#5865F2] hover:bg-[#5865F2]/[0.04]'">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>
              Join Discord
            </a>
          </div>
          <div appAnimateOnScroll [animationDelay]="320" class="flex items-center justify-center gap-3 mt-8 opacity-0 [&.is-visible]:animate-fade-in">
            <div class="flex -space-x-2">
              <div *ngFor="let initial of ['S', 'M', 'P', 'D', 'E']" class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ring-2" [ngClass]="dark ? 'ring-[#0a0a0c]' : 'ring-[#fafafa]'" style="background: linear-gradient(135deg, #6366f1, #8b5cf6)">{{ initial }}</div>
            </div>
            <span class="text-sm" [ngClass]="dark ? 'text-[#3f3f46]' : 'text-[#a1a1aa]'">Join 500K+ engineers</span>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NeetcodeCtaComponent {
  @Input() dark = true;
}
