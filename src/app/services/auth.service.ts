import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id?: string;
  username: string;
  password?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('current_session');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  private getUsers(): User[] {
    const users = localStorage.getItem('app_users');
    return users ? JSON.parse(users) : [];
  }

  register(user: User): boolean {
    const users = this.getUsers();
    if (users.find(u => u.username === user.username)) {
      return false;
    }
    user.id = crypto.randomUUID();
    users.push(user);
    localStorage.setItem('app_users', JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const sessionUser = { id: user.id, username: user.username, createdAt: user.createdAt };
      localStorage.setItem('current_session', JSON.stringify(sessionUser));
      this.currentUserSubject.next(sessionUser);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('current_session');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}