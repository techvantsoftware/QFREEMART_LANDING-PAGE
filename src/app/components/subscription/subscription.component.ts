import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Plan {
  id: string;
  name: string;
  // B2C Base Values
  b2cPrice: number;
  b2cOriginalPrice: number;
  b2cCommission: number;
  // B2B Logic (deduction amount)
  b2bDeduction: number;
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent {
  selectedMode: 'B2C' | 'B2B' = 'B2C';

  // Base configuration for plans
  // Prices are for B2C. B2B deduction is how much commission % drops in B2B mode.
  basePlans: Plan[] = [
    {
      id: 'monthly',
      name: 'Monthly',
      b2cPrice: 289,
      b2cOriginalPrice: 599,
      b2cCommission: 5,
      b2bDeduction: 1,
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      b2cPrice: 899,
      b2cOriginalPrice: 1799,
      b2cCommission: 4,
      b2bDeduction: 0.75,
    },
    {
      id: 'semi',
      name: 'Semi-Annual',
      b2cPrice: 1799,
      b2cOriginalPrice: 3599,
      b2cCommission: 3,
      b2bDeduction: 0.5,
    },
    {
      id: 'annual',
      name: 'Annual',
      b2cPrice: 3599,
      b2cOriginalPrice: 7199,
      b2cCommission: 2,
      b2bDeduction: 0.25,
    },
  ];

  // Function to switch modes
  setMode(mode: 'B2C' | 'B2B') {
    this.selectedMode = mode;
  }

  // Getter to dynamically calculate display values based on selectedMode
  get displayPlans() {
    return this.basePlans.map((plan) => {
      const isB2B = this.selectedMode === 'B2B';

      return {
        ...plan,
        // Price: if B2B, double the price
        currentPrice: isB2B ? plan.b2cPrice * 2 : plan.b2cPrice,

        // Original Price: if B2B, double the original price
        currentOriginalPrice: isB2B
          ? plan.b2cOriginalPrice * 2
          : plan.b2cOriginalPrice,

        // Commission: if B2B, subtract the deduction
        currentCommission: isB2B ? plan.b2bDeduction : plan.b2cCommission,
      };
    });
  }
}
