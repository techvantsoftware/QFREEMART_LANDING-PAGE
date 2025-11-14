import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
 constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  scrollTo(sectionId: string) {
    // Update the fragment in URL
    this.router.navigate([], {
      fragment: sectionId,
      queryParamsHandling: 'preserve'
    });

    // Smooth scroll
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
