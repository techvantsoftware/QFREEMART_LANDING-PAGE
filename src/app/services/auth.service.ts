import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedInStatus = false;

    constructor(private router: Router) {
        // Check localStorage for persistence
        this.isLoggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    }

    login(username: string, password: string): boolean {
        if (username === 'qfreemart@gmail.com' && password === 'qfreemart@1234') {
            this.isLoggedInStatus = true;
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['/dashboard']);
            return true;
        }
        return false;
    }

    logout(): void {
        this.isLoggedInStatus = false;
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return this.isLoggedInStatus;
    }
}
