import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { Testimonial } from '../../shared/data';

@Component({
  selector: 'app-neetcode-testimonials',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section id="loved-by-engineers" class="relative py-24 md:py-32 overflow-hidden transition-colors duration-500 scroll-mt-24" [ngClass]="dark ? 'bg-[#0a0a0c]' : 'bg-[#fafafa]'">
      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <h2 appAnimateOnScroll class="text-3xl md:text-4xl font-bold text-center tracking-tight opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Loved by <span class="hero-gradient-text">engineers</span></h2>
        <p appAnimateOnScroll [animationDelay]="80" class="text-center text-base mt-4 mb-14 opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#52525b]' : 'text-[#71717a]'">See what our community has to say.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div *ngFor="let testimonial of testimonials.slice(0, 3); let i = index" appAnimateOnScroll [animationDelay]="i * 120" class="testimonial-card group relative rounded-2xl p-8 opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'bg-[#111113] border border-white/[0.04] hover:border-white/[0.08]' : 'bg-white border border-black/[0.04] hover:border-black/[0.08]'">
            <span class="quote-gradient text-5xl font-serif leading-none select-none">&ldquo;</span>
            <p class="mt-2 text-sm leading-relaxed" [ngClass]="dark ? 'text-[#a1a1aa]' : 'text-[#52525b]'">{{ testimonial.quote }}</p>
            <div class="flex items-center gap-3 mt-6 pt-6 border-t" [ngClass]="dark ? 'border-white/[0.04]' : 'border-black/[0.04]'">
              <img [src]="testimonial.avatar" [alt]="testimonial.name" class="w-9 h-9 rounded-full object-cover" [ngClass]="dark ? 'ring-1 ring-white/[0.06]' : 'ring-1 ring-black/[0.06]'">
              <div>
                <p class="text-sm font-medium" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">{{ testimonial.name }}</p>
                <p class="text-xs" [ngClass]="dark ? 'text-[#3f3f46]' : 'text-[#a1a1aa]'">{{ testimonial.role }}, {{ testimonial.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NeetcodeTestimonialsComponent {
  @Input() dark = true;
  @Input() testimonials: Testimonial[] = [];
}
