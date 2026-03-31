import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { Stat } from '../../shared/data';

@Component({
  selector: 'app-neetcode-stats',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section class="relative py-24 md:py-32 overflow-hidden transition-colors duration-500" [ngClass]="dark ? 'bg-[#08090a]' : 'bg-white'">
      <div class="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <div appAnimateOnScroll class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center opacity-0 [&.is-visible]:animate-fade-up">
          <div *ngFor="let stat of stats" class="py-4">
            <div class="text-4xl md:text-5xl font-bold tracking-tight" style="font-variant-numeric: tabular-nums" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">
              {{ getStatDisplay(stat) }}<span class="hero-gradient-text">{{ stat.suffix }}</span>
            </div>
            <p class="mt-2 text-sm" [ngClass]="dark ? 'text-[#3f3f46]' : 'text-[#a1a1aa]'">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NeetcodeStatsComponent {
  @Input() dark = true;
  @Input() stats: Stat[] = [];

  getStatDisplay(stat: Stat): string {
    return stat.suffix === '/5' ? (stat.value / 10).toFixed(1) : stat.value.toString();
  }
}
