import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solar-clock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="clock-wrapper">
      <h3>☀️ Ciclo Solar y Lunar</h3>
      <div class="sky-dome" [style.background]="skyGradient">
        <div class="astro" [style.left.px]="astroX" [style.top.px]="astroY" [style.background]="astroColor"></div>
        <div class="horizon"></div>
      </div>
    </div>
  `,
  styles: [`
    .clock-wrapper { display: flex; flex-direction: column; align-items: center; }
    h3 { color: #00ffcc; margin-bottom: 1.5rem; }
    .sky-dome { width: 320px; height: 180px; border-radius: 160px 160px 0 0; position: relative; overflow: hidden; border: 2px solid rgba(255,255,255,0.1); transition: background 0.5s ease; }
    .astro { width: 26px; height: 26px; border-radius: 50%; position: absolute; transform: translate(-13px, -13px); transition: all 0.5s cubic-bezier(0.1, 0.8, 0.3, 1); }
    .horizon { position: absolute; bottom: 0; width: 100%; height: 4px; background: #00ffcc; }
  `]
})
export class SolarClockComponent implements OnChanges {
  @Input() time!: Date;
  astroX = 0;
  astroY = 0;
  astroColor = '#ffcc00';
  skyGradient = '';

  ngOnChanges(): void {
    if (!this.time) return;
    const hrs = this.time.getHours();
    const mins = this.time.getMinutes();
    
    const dayFraction = (hrs + mins / 60) / 24;
    const angle = dayFraction * 2 * Math.PI - Math.PI; 

    const rX = 140;
    const rY = 130;
    this.astroX = 160 + rX * Math.sin(angle);
    this.astroY = 180 + rY * Math.cos(angle);

    if (hrs >= 6 && hrs < 18) {
      this.astroColor = '#ffcc00';
      this.skyGradient = 'linear-gradient(to top, #ff9900, #3399ff)';
    } else {
      this.astroColor = '#e6e6e6';
      this.skyGradient = 'linear-gradient(to top, #111133, #05050f)';
    }
  }
}