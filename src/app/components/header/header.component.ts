import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, // Include RouterModule here
    CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}


  scrollTo(sectionId: string) {

    // Update URL fragment without reloading the page
    this.router.navigate([], {
      fragment: sectionId,
      queryParamsHandling: 'preserve'
    });

    // Smooth scroll
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.isMenuOpen = false;
  }
}
