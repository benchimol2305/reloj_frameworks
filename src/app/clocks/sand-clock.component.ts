import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sand-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clock-wrapper">
      <h3>⌛ Reloj de Arena Abstracto</h3>
      <svg width="200" height="260" viewBox="0 0 200 260">
        <path d="M20,20 L180,20 L110,130 L180,240 L20,240 L90,130 Z" fill="none" stroke="#00ffcc" stroke-width="4"/>
        <path [attr.d]="topSandPath" fill="#e6b800" />
        <line x1="100" y1="130" x2="100" y2="238" stroke="#e6b800" stroke-width="2" [attr.stroke-dasharray]="sec % 2 === 0 ? '4,4' : '0'"/>
        <path [attr.d]="bottomSandPath" fill="#e6b800" />
      </svg>
    </div>
  `,
  styles: [`
    .clock-wrapper { display: flex; flex-direction: column; align-items: center; }
    h3 { margin-bottom: 1.5rem; color: #00ffcc; }
  `]
})
export class SandClockComponent implements OnChanges {
  @Input() time!: Date;
  sec = 0;
  topSandPath = '';
  bottomSandPath = '';

  ngOnChanges(): void {
    if (!this.time) return;
    this.sec = this.time.getSeconds();
    const min = this.time.getMinutes();
    const hr = this.time.getHours();

    const totalSecondsInDay = (hr * 3600) + (min * 60) + this.sec;
    const dayPercentage = totalSecondsInDay / 86400;

    const topY = 20 + (100 * dayPercentage);
    this.topSandPath = `M${20 + (70 * dayPercentage)},${topY} L${180 - (70 * dayPercentage)},${topY} L110,130 L90,130 Z`;
    
    const bottomY = 240 - (100 * dayPercentage);
    this.bottomSandPath = `M${90 + (10 * (1 - dayPercentage))},130 L${110 - (10 * (1 - dayPercentage))},130 L180,240 L20,240 Z`;
  }
}