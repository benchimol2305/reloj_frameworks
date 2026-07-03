import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TimeService } from '../services/time.service';
import { AuthService } from '../services/auth.service';

// Importación directa de los relojes abstractos creados abajo
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
  sliderValue = 0;
  currentTime: Date = new Date();
  private timeSub!: Subscription;

  clocksList = [
    { id: 'sand', name: '⌛ Reloj de Arena Animado' },
    { id: 'candle', name: '🕯️ La Vela Derritiéndose' },
    { id: 'solar', name: '☀️ Ciclo Solar y Lunar' },
    { id: 'pendulum', name: '⛓️ El Péndulo Caótico (Estructura lógica)' },
    { id: 'plant', name: '🌱 Crecimiento Orgánico (Estructura lógica)' },
    { id: 'fuel', name: '⛽ Medidor de Combustible (Estructura lógica)' },
    { id: 'matrix', name: '💾 Cascada de Código Digital (Estructura lógica)' },
    { id: 'ripple', name: '🌊 Marea y Ondas (Estructura lógica)' },
    { id: 'space', name: '🪐 Órbitas Planetarias (Estructura lógica)' },
    { id: 'gears', name: '⚙️ Mecanismo de Engranajes (Estructura lógica)' }
  ];

  constructor(
    private timeService: TimeService, 
    public authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.timeSub = this.timeService.time$.subscribe(time => {
      this.currentTime = time;
    });
  }

  onSliderChange(): void {
    this.timeService.setOffset(this.sliderValue);
  }

  resetSlider(): void {
    this.sliderValue = 0;
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