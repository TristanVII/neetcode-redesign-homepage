import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  INTERVIEW_QUESTION_PREVIEWS,
  PROBLEM_PREVIEWS,
  ROADMAP_TOPICS,
  STATS,
  TESTIMONIALS,
} from '../shared/data';
import {
  COMPANY_LOGOS,
  COURSES,
  FOOTER_COLUMNS,
  GRAPH_LAYOUT_SETTINGS,
  GRAPH_LINKS,
  GRAPH_NODES,
  NAV_LINKS,
} from './neetcode.content';
import { NeetcodeNavComponent } from './components/neetcode-nav.component';
import { NeetcodeHeroComponent } from './components/neetcode-hero.component';
import { NeetcodeTrustedByComponent } from './components/neetcode-trusted-by.component';
import { NeetcodeFeaturesComponent } from './components/neetcode-features.component';
import { NeetcodeCoursesComponent } from './components/neetcode-courses.component';
import { NeetcodeRoadmapComponent } from './components/neetcode-roadmap.component';
import { NeetcodePracticeComponent } from './components/neetcode-practice.component';
import { NeetcodeTestimonialsComponent } from './components/neetcode-testimonials.component';
import { NeetcodeStatsComponent } from './components/neetcode-stats.component';
import { NeetcodeCtaComponent } from './components/neetcode-cta.component';
import { NeetcodeFooterComponent } from './components/neetcode-footer.component';

@Component({
  selector: 'app-neetcode-home',
  standalone: true,
  imports: [
    NeetcodeNavComponent,
    NeetcodeHeroComponent,
    NeetcodeTrustedByComponent,
    NeetcodeFeaturesComponent,
    NeetcodeCoursesComponent,
    NeetcodeRoadmapComponent,
    NeetcodePracticeComponent,
    NeetcodeTestimonialsComponent,
    NeetcodeStatsComponent,
    NeetcodeCtaComponent,
    NeetcodeFooterComponent,
  ],
  template: `
    <app-neetcode-nav
      [dark]="dark"
      [navClass]="navClass"
      [navLinks]="navLinks"
      (toggleThemeRequested)="toggleTheme()"
    />

    <app-neetcode-hero [dark]="dark" [interviewQuestions]="interviewQuestions" />
    <app-neetcode-trusted-by [dark]="dark" [logos]="companyLogos" />
    <app-neetcode-features [dark]="dark" />
    <app-neetcode-courses [dark]="dark" [courses]="courses" />
    <app-neetcode-roadmap
      [dark]="dark"
      [graphWidth]="graphWidth"
      [graphHeight]="graphHeight"
      [graphLayoutSettings]="graphLayoutSettings"
      [graphNodes]="graphNodes"
      [graphLinks]="graphLinks"
    />
    <app-neetcode-practice [dark]="dark" [problemPreviews]="problemPreviews" />
    <app-neetcode-testimonials [dark]="dark" [testimonials]="testimonials" />
    <app-neetcode-stats [dark]="dark" [stats]="stats" />
    <app-neetcode-cta [dark]="dark" />
    <app-neetcode-footer [dark]="dark" [currentYear]="currentYear" [footerColumns]="footerColumns" />
  `,
})
export class NeetcodeHomeComponent implements OnInit {
  readonly testimonials = TESTIMONIALS;
  readonly stats = STATS;
  readonly problemPreviews = PROBLEM_PREVIEWS;
  readonly interviewQuestions = INTERVIEW_QUESTION_PREVIEWS;
  readonly roadmapTopics = ROADMAP_TOPICS;

  readonly navLinks = NAV_LINKS;
  readonly currentYear = new Date().getFullYear();
  readonly graphWidth = 1100;
  readonly graphHeight = 720;
  readonly graphLayoutSettings = GRAPH_LAYOUT_SETTINGS;
  readonly graphNodes = GRAPH_NODES;
  readonly graphLinks = GRAPH_LINKS;
  readonly companyLogos = COMPANY_LOGOS;
  readonly footerColumns = FOOTER_COLUMNS;
  readonly courses = COURSES;

  scrolled = false;
  theme: 'dark' | 'light' = 'dark';

  get dark(): boolean {
    return this.theme === 'dark';
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme-preference');
      if (saved === 'dark' || saved === 'light') {
        this.theme = saved;
      }
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme-preference', this.theme);
    }
  }

  get navClass(): string {
    if (this.dark) {
      return this.scrolled
        ? 'bg-[#08090a]/80 backdrop-blur-xl saturate-[1.8] border-b border-white/[0.04]'
        : 'bg-transparent';
    }
    return this.scrolled
      ? 'bg-white/90 backdrop-blur-xl saturate-[1.8] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
      : 'bg-transparent';
  }
}
