import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oci',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oci.component.html',
  styleUrls: ['./oci.component.css']
})
export class OciComponent {
  allFeatures = [
    { icon: '📦', text: 'Stock Toggle System',details:"Stock" },
    { icon: '🙏', text: 'Local Trust Ecosystem',details: ""},
    { icon: '∞', text: 'Truly Omniversal' ,details:""},
    { icon: '🎁', text: 'Products + Services Together',details: ""},
    { icon: '📅', text: 'Online Appointment Booking',details:"" },
    { icon: '🚚', text: 'Remote Queue Management' ,details: ""},
    { icon: '🛒', text: 'Multi-Channel Commerce' ,details:"" },
    { icon: '🌍', text: 'Hyperlocal → Global Reach' ,details:"" },
    { icon: '🏪', text: 'Smart Store Setup' ,details: ""},
    { icon: '📊', text: 'Vendor Analytics' ,details: ""},
    { icon: '💳', text: 'Payments & Deliveries',details:"" },
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