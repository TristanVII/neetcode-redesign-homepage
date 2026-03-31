import { Directive, ElementRef, AfterViewInit, OnDestroy, Input, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements AfterViewInit, OnDestroy {
  @Input() animationDelay = 0;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.classList.add('is-visible');
      return;
    }

    if (this.animationDelay) {
      this.el.nativeElement.style.animationDelay = `${this.animationDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('is-visible');
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
