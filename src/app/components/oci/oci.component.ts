import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oci',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oci.component.html',
  styleUrls: ['./oci.component.css']
})
export class OciComponent {
  features = [
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
}
