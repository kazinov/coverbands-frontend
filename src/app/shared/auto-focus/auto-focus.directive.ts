import { AfterContentInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit, OnDestroy {
  unsubscribe$ = new Subject();

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
    timer(500)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.el.nativeElement.focus();
      });
  }

    ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
