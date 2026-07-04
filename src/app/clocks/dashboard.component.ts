import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TimeService } from '../services/time.service';
import { AuthService } from '../services/auth.service';

import { SandClockComponent } from './sand-clock.component';
import { CandleClockComponent } from './candle-clock.component';
import { SolarClockComponent } from './solar-clock.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    SandClockComponent, 
    CandleClockComponent, 
    SolarClockComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  selectedClock = 'sand';
  

  sliderMinutes = 0; 
  
  currentTime: Date = new Date();
  displayHours = 0;
  displayMinutes = 0;
  displaySeconds = 0;
  private timeSub!: Subscription;


  clocksList = [
    { id: 'sand', name: '⌛ Reloj de Arena Animado' },
    { id: 'candle', name: '🕯️ La Vela Derritiéndose' },
    { id: 'solar', name: '☀️ Ciclo Solar y Lunar' },
    { id: 'pendulum', name: '⛓️ El Péndulo Caótico' },
    { id: 'plant', name: '🌱 Crecimiento Orgánico' },
    { id: 'fuel', name: '⛽ Medidor de Combustible' },
    { id: 'matrix', name: '💾 Cascada de Código Digital' },
    { id: 'ripple', name: '🌊 Marea y Ondas Concéntricas' },
    { id: 'space', name: '🪐 Órbitas Planetarias' },
    { id: 'gears', name: '⚙️ Mecanismo de Engranajes' }
  ];

  constructor(
    private timeService: TimeService, 
    public authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.currentTime = time;
      this.displayHours = time.getHours();
      this.displayMinutes = time.getMinutes();
      this.displaySeconds = time.getSeconds();
      

      if (this.sliderMinutes === 0) {
        this.sliderMinutes = (this.displayHours * 60) + this.displayMinutes;
      }
    });
  }


  onSliderChange(): void {
    const targetHours = Math.floor(this.sliderMinutes / 60);
    const targetMinutes = this.sliderMinutes % 60;
    
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHours, targetMinutes, 0);
    
    
    const offsetMs = targetDate.getTime() - now.getTime();
    
   
    this.timeService.setOffset(offsetMs / (60 * 60 * 1000));
  }

  resetSlider(): void {
    const now = new Date();
    this.sliderMinutes = (now.getHours() * 60) + now.getMinutes();
    this.timeService.resetTime();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    if (this.timeSub) this.timeSub.unsubscribe();
  }
}