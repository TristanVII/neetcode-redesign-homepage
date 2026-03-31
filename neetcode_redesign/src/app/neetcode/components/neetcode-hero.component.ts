import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { InterviewQuestionPreview } from '../../shared/data';

@Component({
  selector: 'app-neetcode-hero',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  template: `
    <section class="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden transition-colors duration-500" [ngClass]="dark ? 'bg-[#08090a]' : 'bg-white'">
      <div class="pointer-events-none absolute inset-0"><div class="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full" [style.background]="dark ? 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)' : 'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)'" style="filter: blur(80px)"></div></div>
      <div class="pointer-events-none absolute inset-0 noise-overlay"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full text-center">
        <div appAnimateOnScroll class="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 opacity-0 [&.is-visible]:animate-fade-up cursor-default navi-pill" [ngClass]="dark ? 'bg-white/[0.03] border border-white/[0.06] hover:border-[#6366f1]/20' : 'bg-black/[0.02] border border-black/[0.05] hover:border-[#4f46e5]/20'"><img src="assets/profiles/navi.png" alt="Navi" class="w-8 h-8 rounded-full object-cover shrink-0"><span class="text-sm" [ngClass]="dark ? 'text-[#71717a]' : 'text-[#52525b]'">Built by <span class="font-semibold" [ngClass]="dark ? 'text-[#a1a1aa]' : 'text-[#3f3f46]'">Navi</span><span class="mx-1.5 opacity-30">—</span>from unemployed to <span class="font-semibold" [ngClass]="dark ? 'text-[#a1a1aa]' : 'text-[#3f3f46]'">Google</span></span></div>
        <div class="navi-story-card pointer-events-none absolute left-1/2 -translate-x-1/2 w-[480px] rounded-2xl z-50 opacity-0 transition-all duration-500 overflow-hidden" [ngClass]="dark ? 'bg-[#111113] border border-white/[0.06]' : 'bg-white border border-black/[0.06]'" [style.box-shadow]="dark ? '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.06)' : '0 20px 60px rgba(0,0,0,0.08), 0 0 40px rgba(99,102,241,0.03)'" style="top: 110px"><div class="flex flex-col"><div class="relative h-48 overflow-hidden flex items-end justify-center" [style.background]="dark ? 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))' : 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))'"><img src="assets/profiles/navi.png" alt="Navi" class="h-44 object-contain"></div><div class="p-6"><h4 class="text-base font-semibold mb-2" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Hi, I'm Navi</h4><p class="text-xs leading-relaxed" [ngClass]="dark ? 'text-[#71717a]' : 'text-[#52525b]'">I created NeetCode in 2020 when I was unemployed and couldn't find a job. I received so many messages from others who got jobs after studying with my videos — it kept me motivated. About a year later I managed to get a job at <span class="font-semibold" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Google</span>. What started as a YouTube channel has grown into a platform used by <span class="font-semibold" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">500,000+ engineers</span>.</p></div></div></div>
        <h1 appAnimateOnScroll [animationDelay]="80" class="font-bold tracking-tight leading-[1.08] opacity-0 [&.is-visible]:animate-fade-up" style="font-size: clamp(2.5rem, 6vw, 4.5rem)" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Interview prep that actually gets you <a href="#loved-by-engineers" class="hero-gradient-text underline decoration-white/10 underline-offset-[0.18em] transition-opacity duration-300 hover:opacity-85">hired</a>.</h1>
        <p appAnimateOnScroll [animationDelay]="180" class="mt-6 text-lg md:text-xl max-w-2xl mx-auto opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#71717a]' : 'text-[#52525b]'">Pattern-first prep for coding interviews, system design, and the exact skills that turn practice into offers.</p>
        <div appAnimateOnScroll [animationDelay]="280" class="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0 [&.is-visible]:animate-fade-up"><a href="#" class="cta-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-medium text-base">Start Learning Free<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></a><a href="#" class="inline-flex items-center px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 border" [ngClass]="dark ? 'border-white/[0.08] text-[#a1a1aa] hover:text-[#e4e4e7] hover:border-white/[0.15] hover:bg-white/[0.03]' : 'border-black/[0.08] text-[#52525b] hover:text-[#09090b] hover:border-black/[0.15] hover:bg-black/[0.02]'">View Roadmap</a><a href="#" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-medium text-base transition-opacity duration-300 hover:opacity-95" [ngClass]="dark ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] shadow-[0_12px_40px_rgba(99,102,241,0.28)]' : 'bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] shadow-[0_12px_40px_rgba(79,70,229,0.18)]'"><span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/15">PRO</span><span>Get Pro</span></a></div>
        <div appAnimateOnScroll [animationDelay]="400" class="mt-20 max-w-4xl mx-auto opacity-0 [&.is-visible]:animate-scale-up">
          <div class="mac-window relative rounded-2xl overflow-hidden" [ngClass]="dark ? 'bg-[#111113] border border-white/[0.06]' : 'bg-white border border-black/[0.08]'" [style.box-shadow]="dark ? '0 0 0 1px rgba(255,255,255,0.03), 0 20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(99,102,241,0.06)' : '0 0 0 1px rgba(0,0,0,0.02), 0 20px 60px rgba(0,0,0,0.08), 0 0 80px rgba(99,102,241,0.04)'">
            <div class="flex items-center gap-2 px-5 py-3 border-b transition-colors duration-300" [ngClass]="dark ? 'bg-[#0c0c0e] border-white/[0.04]' : 'bg-[#f8f9fb] border-black/[0.06]'">
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span><span class="w-3 h-3 rounded-full bg-[#febc2e]"></span><span class="w-3 h-3 rounded-full bg-[#28c840]"></span></div>
              <div class="flex-1 flex justify-center"><span class="text-xs font-mono px-3 py-0.5 rounded-md" [ngClass]="dark ? 'text-[#3f3f46] bg-white/[0.03]' : 'text-[#a1a1aa] bg-black/[0.03]'">neetcode.io/practice</span></div>
              <div class="w-[52px]"></div>
            </div>
            <div class="p-5 md:p-8"><div class="flex gap-6">
              <div class="hidden md:flex flex-col w-48 shrink-0 border-r pr-4 transition-colors duration-300" [ngClass]="dark ? 'border-white/[0.04]' : 'border-black/[0.06]'">
                <div class="flex items-center gap-2 px-2 py-1.5 cursor-pointer" [ngClass]="dark ? 'text-[#a1a1aa]' : 'text-[#52525b]'"><span class="text-xs">⌨️</span><span class="text-[11px] font-semibold flex-1">Coding Interviews</span><svg class="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg></div>
                <div class="ml-4 pl-3 flex flex-col gap-0.5 mb-1.5" [ngClass]="dark ? 'border-l border-white/[0.06]' : 'border-l border-black/[0.06]'"><div *ngFor="let item of ['Problems', 'Company Tagged', 'Quizzes']" class="text-[11px] py-0.5 cursor-pointer transition-colors" [ngClass]="dark ? 'text-[#52525b] hover:text-[#a1a1aa]' : 'text-[#a1a1aa] hover:text-[#52525b]'">{{ item }}</div></div>
                <div class="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer -mx-1 my-0.5 justify-start text-left" [ngClass]="dark ? 'bg-white/[0.05] text-[#e4e4e7]' : 'bg-black/[0.04] text-[#09090b]'"><span class="text-xs shrink-0">🌐</span><span class="text-[11px] font-semibold flex-1 text-left">System Design</span></div>
                <div class="flex items-center gap-2 px-2 py-1.5 mt-0.5 cursor-pointer" [ngClass]="dark ? 'text-[#a1a1aa]' : 'text-[#52525b]'"><span class="text-xs">🧠</span><span class="text-[11px] font-semibold flex-1">Machine Learning</span><span class="text-[8px] font-bold px-1.5 py-0.5 rounded-full" [ngClass]="dark ? 'bg-[#ca8a04]/15 text-[#eab308]' : 'bg-yellow-100 text-yellow-700'">NEW</span><svg class="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg></div>
                <div class="ml-4 pl-3 flex flex-col gap-0.5 mb-1.5" [ngClass]="dark ? 'border-l border-white/[0.06]' : 'border-l border-black/[0.06]'"><div *ngFor="let item of ['Problems', 'Build Your GPT']" class="text-[11px] py-0.5 cursor-pointer transition-colors" [ngClass]="dark ? 'text-[#52525b] hover:text-[#a1a1aa]' : 'text-[#a1a1aa] hover:text-[#52525b]'">{{ item }}</div></div>
                <div class="flex items-center gap-2 px-2 py-1.5 cursor-pointer" [ngClass]="dark ? 'text-[#a1a1aa]' : 'text-[#52525b]'"><span class="text-xs">🔧</span><span class="text-[11px] font-semibold">Low Level Design</span></div>
                <div class="flex items-center gap-2 px-2 py-1.5 cursor-pointer" [ngClass]="dark ? 'text-[#a1a1aa]' : 'text-[#52525b]'"><span class="text-xs">🗄️</span><span class="text-[11px] font-semibold">Databases</span></div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="mb-4">
                  <h3 class="text-sm font-semibold" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Interview Questions</h3>
                </div>
                <div class="overflow-hidden rounded-xl border" [ngClass]="dark ? 'border-white/[0.04] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.01]'">
                  <div class="grid items-center px-4 py-3 text-[11px] font-semibold uppercase tracking-wider border-b" style="grid-template-columns: minmax(0, 1fr) 96px" [ngClass]="dark ? 'text-[#a1a1aa] border-white/[0.04]' : 'text-[#52525b] border-black/[0.06]'">
                    <span>Problem</span>
                    <span class="text-right">Difficulty</span>
                  </div>
                  <div class="divide-y" [ngClass]="dark ? 'divide-white/[0.04]' : 'divide-black/[0.06]'">
                    <div *ngFor="let question of interviewQuestions" class="grid items-center gap-3 px-4 py-3 text-sm" style="grid-template-columns: minmax(0, 1fr) 96px">
                      <span class="truncate" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">{{ question.title }}</span>
                      <span class="text-right font-semibold" [ngClass]="question.difficulty === 'Easy' ? 'text-neet-easy' : question.difficulty === 'Medium' ? 'text-neet-medium' : 'text-neet-hard'">{{ question.difficulty }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div></div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NeetcodeHeroComponent {
  @Input() dark = true;
  @Input() interviewQuestions: InterviewQuestionPreview[] = [];
}
