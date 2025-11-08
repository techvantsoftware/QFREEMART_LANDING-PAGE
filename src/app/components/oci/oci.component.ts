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
    { icon: '📦', text: 'Stock Toggle System' },
    { icon: '🙏', text: 'Local Trust Ecosystem' },
    { icon: '∞', text: 'Truly Omniversal' },
    { icon: '🎁', text: 'Products + Services Together' },
    { icon: '📅', text: 'Online Appointment Booking' },
    { icon: '🚚', text: 'Remote Queue Management' },
    { icon: '🛒', text: 'Multi-Channel Commerce' },
    { icon: '🌍', text: 'Hyperlocal → Global Reach' },
    { icon: '🏪', text: 'Smart Store Setup' },
    { icon: '📊', text: 'Vendor Analytics' },
    { icon: '💳', text: 'Payments & Deliveries' }
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