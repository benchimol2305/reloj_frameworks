import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, rellene todos los campos.';
      return;
    }

    if (this.isLoginMode) {
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Credenciales inválidas.';
      }
    } else {
      const newUser = {
        username: this.username,
        password: this.password,
        createdAt: new Date().toISOString()
      };
      if (this.authService.register(newUser)) {
        this.successMessage = '¡Registro exitoso! Ya puedes iniciar sesión.';
        this.isLoginMode = true;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'El nombre de usuario ya se encuentra registrado.';
      }
    }
  }
}