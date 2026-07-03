import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private timeOffset = new BehaviorSubject<number>(0);

  public time$: Observable<Date> = timer(0, 100).pipe(
    map(() => {
      const realTime = new Date().getTime();
      return new Date(realTime + this.timeOffset.value);
    })
  );

  setOffset(hoursOffset: number): void {
    const msOffset = hoursOffset * 60 * 60 * 1000;
    this.timeOffset.next(msOffset);
  }

  resetTime(): void {
    this.timeOffset.next(0);
  }
}