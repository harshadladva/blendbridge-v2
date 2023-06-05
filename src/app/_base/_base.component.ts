import { AfterViewInit, Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Directive()
export abstract class OnDestroyMixin implements OnDestroy {
  readonly destroyed$ = new Subject<void>();
  loading$ = new BehaviorSubject<boolean>(false);

  ngOnDestroy() {
    this.onDestroy();
  }

  protected onDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.loading$.complete();
  }
}

@Directive()
export abstract class BaseComponent
  extends OnDestroyMixin
  implements OnInit, AfterViewInit
{
  ngOnInit() {
    this.onInit();
  }

  ngAfterViewInit() {
    this.afterViewInit();
  }

  protected onInit() {}

  protected afterViewInit() {}
}
