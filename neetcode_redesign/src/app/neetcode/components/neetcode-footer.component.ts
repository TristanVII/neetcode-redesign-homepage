import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FooterColumn } from '../neetcode.content';

@Component({
  selector: 'app-neetcode-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="relative py-16 border-t transition-colors duration-500" [ngClass]="dark ? 'bg-[#08090a] border-white/[0.04]' : 'bg-white border-black/[0.04]'">
      <div class="max-w-6xl mx-auto px-6 md:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div class="col-span-2 md:col-span-1">
            <span class="text-lg font-bold" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'"><span class="hero-gradient-text">Neet</span>Code</span>
            <p class="mt-3 text-sm leading-relaxed" [ngClass]="dark ? 'text-[#3f3f46]' : 'text-[#a1a1aa]'">A better way to prepare for coding interviews.</p>
          </div>
          <div *ngFor="let column of footerColumns">
            <h4 class="text-sm font-semibold mb-4" [ngClass]="dark ? 'text-[#71717a]' : 'text-[#09090b]'">{{ column.title }}</h4>
            <ul class="space-y-2.5">
              <li *ngFor="let link of column.links"><a href="#" class="text-sm transition-colors duration-300" [ngClass]="dark ? 'text-[#3f3f46] hover:text-[#71717a]' : 'text-[#a1a1aa] hover:text-[#52525b]'">{{ link }}</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-14 pt-8 border-t text-center" [ngClass]="dark ? 'border-white/[0.04]' : 'border-black/[0.04]'">
          <p class="text-xs" [ngClass]="dark ? 'text-[#27272a]' : 'text-[#d4d4d8]'">&copy; {{ currentYear }} NeetCode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
})
export class NeetcodeFooterComponent {
  @Input() dark = true;
  @Input() currentYear = new Date().getFullYear();
  @Input() footerColumns: FooterColumn[] = [];
}
