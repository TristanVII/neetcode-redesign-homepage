import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { Course } from '../neetcode.content';

@Component({
  selector: 'app-neetcode-courses',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section class="relative py-24 md:py-32 overflow-hidden transition-colors duration-500" [ngClass]="dark ? 'bg-[#08090a]' : 'bg-white'">
      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div class="flex items-end justify-between mb-14">
          <div>
            <p appAnimateOnScroll class="text-xs font-semibold tracking-[0.2em] uppercase mb-4 opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#6366f1]' : 'text-[#4f46e5]'">LEARN</p>
            <h2 appAnimateOnScroll [animationDelay]="60" class="text-3xl md:text-5xl font-bold tracking-tight opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Courses</h2>
          </div>
          <a appAnimateOnScroll [animationDelay]="120" href="#" class="hidden md:flex items-center gap-1.5 text-sm font-medium opacity-0 [&.is-visible]:animate-fade-up transition-colors" [ngClass]="dark ? 'text-[#6366f1] hover:text-[#818cf8]' : 'text-[#4f46e5] hover:text-[#6366f1]'">View all<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></a>
        </div>
      </div>

      <div appAnimateOnScroll [animationDelay]="180" class="carousel-wrapper group/carousel relative opacity-0 [&.is-visible]:animate-fade-up">
        <button (click)="scrollCourses('left')" class="absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer" [style.background]="dark ? 'linear-gradient(to right, rgba(8,9,10,0.95), transparent)' : 'linear-gradient(to right, rgba(255,255,255,0.95), transparent)'">
          <div class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200" [ngClass]="dark ? 'bg-white/[0.08] hover:bg-white/[0.15] text-white' : 'bg-black/[0.05] hover:bg-black/[0.1] text-black'"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg></div>
        </button>
        <button (click)="scrollCourses('right')" class="absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer" [style.background]="dark ? 'linear-gradient(to left, rgba(8,9,10,0.95), transparent)' : 'linear-gradient(to left, rgba(255,255,255,0.95), transparent)'">
          <div class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200" [ngClass]="dark ? 'bg-white/[0.08] hover:bg-white/[0.15] text-white' : 'bg-black/[0.05] hover:bg-black/[0.1] text-black'"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></div>
        </button>

        <div #coursesTrack class="flex gap-5 overflow-x-hidden pl-6 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-6" style="scroll-behavior: smooth;">
          <div *ngFor="let course of courses" class="course-card group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer" style="width: 320px;" [ngClass]="dark ? 'bg-[#111113] border border-white/[0.04] hover:border-white/[0.1]' : 'bg-white border border-black/[0.04] hover:border-black/[0.1]'">
            <div class="relative h-48 overflow-hidden" [style.background]="course.badgeColor === 'green' ? (dark ? 'linear-gradient(135deg, rgba(74,222,128,0.05) 0%, rgba(99,102,241,0.03) 100%)' : 'linear-gradient(135deg, rgba(74,222,128,0.05) 0%, rgba(99,102,241,0.02) 100%)') : (dark ? 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%)' : 'linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(139,92,246,0.02) 100%)')">
              <img [src]="course.image" [alt]="course.title" class="w-full h-full object-contain p-5 transition-transform duration-700 group-hover:scale-110">
              <span class="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" [ngClass]="course.badgeColor === 'green' ? (dark ? 'bg-neet-easy/15 text-neet-easy' : 'bg-green-100 text-green-700') : (dark ? 'bg-[#8b5cf6]/15 text-[#a78bfa]' : 'bg-purple-100 text-purple-700')">{{ course.badge }}</span>
            </div>
            <div class="p-5">
              <h3 class="text-sm font-semibold mb-1.5 leading-snug" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">{{ course.title }}</h3>
              <p class="text-xs leading-relaxed mb-3 line-clamp-2" [ngClass]="dark ? 'text-[#52525b]' : 'text-[#71717a]'">{{ course.description }}</p>
              <div class="flex items-center gap-3 text-xs" [ngClass]="dark ? 'text-[#3f3f46]' : 'text-[#a1a1aa]'"><span>{{ course.lessons }} lessons</span><span class="w-0.5 h-0.5 rounded-full" [ngClass]="dark ? 'bg-[#3f3f46]' : 'bg-[#a1a1aa]'"></span><span>{{ course.hours }}h</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NeetcodeCoursesComponent {
  @ViewChild('coursesTrack') coursesTrack!: ElementRef<HTMLDivElement>;
  @Input() dark = true;
  @Input() courses: Course[] = [];

  scrollCourses(direction: 'left' | 'right'): void {
    const el = this.coursesTrack?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction === 'right' ? 340 : -340, behavior: 'smooth' });
  }
}
