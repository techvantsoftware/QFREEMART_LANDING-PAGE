import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oci',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oci.component.html',
  styleUrls: ['./oci.component.css'],
})
export class OciComponent {
  allFeatures = [
    {
      icon: '📦',
      text: 'Stock Toggle System',
      details: 'Go out of stock or live instantly — stay fully in control.',
    },
    {
      icon: '🙏',
      text: 'Local Trust Ecosystem',
      details: 'Buyers see clear conditions. Sellers earn lasting trust.',
    },
    {
      icon: '🎁',
      text: 'Products + Services Together',
      details: 'Sell products and services together — without complexity.',
    },
    {
      icon: '📅',
      text: 'Online Appointment Booking',
      details: 'Let customers book slots instantly, without calls.',
    },
    {
      icon: '🚚',
      text: 'Remote Queue Management',
      details: 'Customers wait remotely. You serve smoothly.',
    },
    {
      icon: '🛒',
      text: 'Multi-Channel Commerce',
      details: 'Sell online, offline, and locally — from one system.',
    },
    {
      icon: '🌍',
      text: 'Hyperlocal → Global Reach',
      details: 'Global Reach Start local. Expand your reach anytime.',
    },
    {
      icon: '🏪',
      text: 'Smart Store Setup',
      details:
        'Launch your digital store in minutes — no tech skills required.',
    },
    {
      icon: '📊',
      text: 'Vendor Analytics',
      details: 'See what sells, what stalls, and where to grow next.',
    },
    {
      icon: '💳',
      text: 'Payments & Deliveries',
      details: 'Track orders, deliveries, and settlements in one flow.',
    },
  ];

  features = this.allFeatures; // will be filtered based on screen width

  ngOnInit() {
    this.updateFeatures(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateFeatures(event.target.innerWidth);
  }

  private updateFeatures(width: number) {
    if (width <= 768) {
      // Mobile — show only first 6 cards
      this.features = this.allFeatures.slice(0, 6);
    } else {
      // Tablet/Desktop — show all cards
      this.features = this.allFeatures;
    }
  }
}
