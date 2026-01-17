import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-website';
  isDashboardRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isDashboardRoute = event.url.includes('/dashboard') || event.url.includes('/login');
      }
    });
  }
}
