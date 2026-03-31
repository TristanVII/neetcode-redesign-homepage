import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { curveBundle } from 'd3-shape';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { GraphLinkModel, GraphNodeModel } from '../neetcode.content';

@Component({
  selector: 'app-neetcode-roadmap',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, NgxGraphModule],
  template: `
    <section class="relative py-24 md:py-32 overflow-hidden transition-colors duration-500" [ngClass]="dark ? 'bg-[#0a0a0c]' : 'bg-[#fafafa]'">
      <div class="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <h2 appAnimateOnScroll class="text-3xl md:text-4xl font-bold text-center tracking-tight opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">Follow the <span class="hero-gradient-text">Roadmap</span></h2>
        <p appAnimateOnScroll [animationDelay]="80" class="text-center text-base mt-4 mb-14 opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'text-[#52525b]' : 'text-[#71717a]'">Visualize your learning path. Track progress across every topic.</p>
        <div appAnimateOnScroll [animationDelay]="160" class="rounded-2xl overflow-hidden opacity-0 [&.is-visible]:animate-fade-up" [ngClass]="dark ? 'bg-[#111113] border border-white/[0.04]' : 'bg-white border border-black/[0.04]'" [style.box-shadow]="dark ? '0 0 0 1px rgba(255,255,255,0.02), 0 8px 32px rgba(0,0,0,0.3)' : '0 0 0 1px rgba(0,0,0,0.02), 0 8px 32px rgba(0,0,0,0.04)'">
          <div class="px-6 py-4 border-b flex items-center justify-between" [ngClass]="dark ? 'border-white/[0.04]' : 'border-black/[0.04]'">
            <span class="text-sm font-semibold" [ngClass]="dark ? 'text-[#e4e4e7]' : 'text-[#09090b]'">DSA Roadmap</span>
            <div class="flex items-center gap-3"><span class="text-xs px-2.5 py-1 rounded-full font-medium" [ngClass]="dark ? 'bg-neet-easy/10 text-neet-easy' : 'bg-green-50 text-green-600'">45% complete</span></div>
          </div>
          <div class="roadmap-graph-container relative" [style.height.px]="graphHeight">
            <div class="absolute inset-0 z-10"></div>
            <ngx-graph [links]="graphLinks" [nodes]="graphNodes" [layout]="'dagre'" [layoutSettings]="graphLayoutSettings" [curve]="curve" [view]="[graphWidth, graphHeight]" [autoZoom]="true" [autoCenter]="true" [panningEnabled]="false" [enableZoom]="false" [draggingEnabled]="false" [animate]="true">
              <ng-template #nodeTemplate let-node>
                <svg:foreignObject [attr.width]="node.dimension.width" [attr.height]="node.dimension.height">
                  <div xmlns="http://www.w3.org/1999/xhtml" class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer border transition-all duration-200 hover:scale-[1.03]" [style.width.px]="node.dimension.width" [style.height.px]="node.dimension.height" [style.fontSize.px]="14" [ngClass]="node.data.progress >= 100 ? (dark ? 'bg-neet-easy/[0.12] border-neet-easy/30 text-neet-easy' : 'bg-green-50 border-green-200/60 text-green-700') : node.data.progress > 50 ? (dark ? 'bg-[#6366f1]/[0.12] border-[#6366f1]/30 text-[#818cf8]' : 'bg-indigo-50 border-indigo-200/60 text-indigo-700') : node.data.progress > 0 ? (dark ? 'bg-[#6366f1]/[0.06] border-[#6366f1]/15 text-[#a1a1aa]' : 'bg-indigo-50/50 border-indigo-100 text-[#52525b]') : (dark ? 'bg-white/[0.03] border-white/[0.06] text-[#71717a]' : 'bg-gray-50 border-black/[0.06] text-[#71717a]')">
                    <span class="w-2.5 h-2.5 rounded-full shrink-0" [ngClass]="node.data.progress >= 100 ? 'bg-neet-easy' : node.data.progress > 0 ? (dark ? 'bg-[#6366f1]' : 'bg-indigo-500') : (dark ? 'bg-[#3f3f46]' : 'bg-[#d4d4d8]')"></span>
                    <span class="whitespace-nowrap">{{ node.label }}</span>
                    <span class="text-xs opacity-60 ml-auto whitespace-nowrap">{{ node.data.progress }}%</span>
                  </div>
                </svg:foreignObject>
              </ng-template>
              <ng-template #linkTemplate let-link><svg:g><svg:path [attr.d]="link.line" stroke-width="2" [attr.stroke]="dark ? 'rgba(99,102,241,0.25)' : 'rgba(79,70,229,0.18)'" fill="none" marker-end="url(#arrow)"></svg:path></svg:g></ng-template>
              <ng-template #defsTemplate><svg:marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><svg:path d="M 0 0 L 10 5 L 0 10 z" [attr.fill]="dark ? 'rgba(99,102,241,0.4)' : 'rgba(79,70,229,0.3)'"/></svg:marker></ng-template>
            </ngx-graph>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NeetcodeRoadmapComponent {
  @Input() dark = true;
  @Input() graphWidth = 1100;
  @Input() graphHeight = 720;
  @Input() graphLayoutSettings: Record<string, unknown> = {};
  @Input() graphNodes: GraphNodeModel[] = [];
  @Input() graphLinks: GraphLinkModel[] = [];
  readonly curve = curveBundle.beta(0.8);
}
