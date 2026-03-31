import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { ProblemPreview } from '../../shared/data';

@Component({
  selector: 'app-neetcode-practice',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section class="relative py-24 md:py-32 overflow-hidden transition-colors duration-500" [ngClass]="dark ? 'bg-[#08090a]' : 'bg-white'">
      <div class="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        <h2 appAnimateOnScroll class="text-3xl md:text-4xl font-bold text-center tracking-tight opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Practice <span class="hero-gradient-text">Problems</span></h2>
        <p appAnimateOnScroll [animationDelay]="80" class="text-center text-base mt-4 mb-14 opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#52525b]' : 'text-[#71717a]'">Hand-picked problems covering every pattern asked at top companies.</p>
        <div appAnimateOnScroll [animationDelay]="160" class="rounded-2xl overflow-hidden opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'bg-[#111113] border border-white/[0.04]' : 'bg-white border border-black/[0.04]'">
          <div class="grid items-center px-5 py-3 text-xs font-medium uppercase tracking-wider border-b" style="grid-template-columns: 2.5rem 1fr auto auto" [ngClass]="dark ? 'text-[#3f3f46] border-white/[0.04]' : 'text-[#a1a1aa] border-black/[0.04]'">
            <span>#</span><span>Title</span><span class="hidden md:block w-20 text-center">Difficulty</span><span class="text-right w-12">Rate</span>
          </div>
          <div class="divide-y" [ngClass]="dark ? 'divide-white/[0.03]' : 'divide-black/[0.03]'">
            <div *ngFor="let problem of problemPreviews" class="grid items-center px-5 py-3.5 text-sm transition-colors duration-200 cursor-pointer" style="grid-template-columns: 2.5rem 1fr auto auto" [ngClass]="dark ? 'hover:bg-white/[0.015]' : 'hover:bg-black/[0.015]'">
              <span class="tabular-nums" [ngClass]="dark ? 'text-[#3f3f46]' : 'text-[#a1a1aa]'">{{ problem.id }}</span>
              <span class="font-medium truncate pr-4" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">{{ problem.title }}</span>
              <span class="hidden md:inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full w-20 justify-center" [ngClass]="problem.difficulty === 'Easy' ? (dark ? 'text-neet-easy bg-neet-easy/10' : 'text-green-600 bg-green-50') : problem.difficulty === 'Medium' ? (dark ? 'text-neet-medium bg-neet-medium/10' : 'text-amber-600 bg-amber-50') : (dark ? 'text-neet-hard bg-neet-hard/10' : 'text-red-600 bg-red-50')">{{ problem.difficulty }}</span>
              <span class="text-right text-xs tabular-nums w-12" [ngClass]="dark ? 'text-[#52525b]' : 'text-[#71717a]'">{{ problem.acceptance }}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NeetcodePracticeComponent {
  @Input() dark = true;
  @Input() problemPreviews: ProblemPreview[] = [];
}
