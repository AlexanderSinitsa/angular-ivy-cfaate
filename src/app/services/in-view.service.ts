import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InViewService {
  private triggerSubject = new Subject<IntersectionObserverEntry>();
  public trigger$ = this.triggerSubject.asObservable()

  private targets: { [key: string]: Element } = {};
  private intersectionObserver: IntersectionObserver;


  registerTarget(target: Element, config: IntersectionObserverInit, inViewId: string) {
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries?.length) {
            entries.forEach((entry) => this.triggerSubject.next(entry));
          }
        },
        config
      )
    }

    if (!this.targets[inViewId]) {
      this.targets[inViewId] = target;
      this.intersectionObserver.observe(target);
    }
  }

  unregisterTarget(target: Element, inViewId: string) {
    if (this.targets[inViewId]) {
      this.intersectionObserver.unobserve(target);

      delete this.targets[inViewId];
    }
  }

}
