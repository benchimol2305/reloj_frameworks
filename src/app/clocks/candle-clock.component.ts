import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candle-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clock-wrapper">
      <h3>🕯️ La Vela del Tiempo</h3>
      <div class="candle-stage">
        <div class="flame" [style.transform]="flameScale" [style.opacity]="flameOpacity"></div>
        <div class="wick"></div>
        <div class="candle-body" [style.height.px]="candleHeight">
          <div class="marking" style="top: 25%">18h</div>
          <div class="marking" style="top: 50%">12h</div>
          <div class="marking" style="top: 75%">06h</div>
        </div>
        <div class="base"></div>
      </div>
    </div>
  `,
  styleUrls: ['./candle-clock.component.css']
})
export class CandleClockComponent implements OnChanges {
  @Input() time!: Date;
  candleHeight = 180;
  flameScale = 'scale(1)';
  flameOpacity = 1;

  ngOnChanges(): void {
    if (!this.time) return;
    const hours = this.time.getHours();
    const minutes = this.time.getMinutes();

    const totalProgress = (hours + minutes / 60) / 24;
    this.candleHeight = Math.max(20, 200 * (1 - totalProgress));

    const seconds = this.time.getSeconds();
    const pulse = 1 + (Math.sin(seconds) * 0.15);
    this.flameScale = `scale(${pulse})`;
    this.flameOpacity = 0.8 + (seconds % 2 * 0.2);
  }
}