import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactformComponent } from '../contactform/contactform.component';
import { OciComponent } from '../oci/oci.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { WhyChooseUsComponent } from '../why-choose-us/why-choose-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    OciComponent,
    SubscriptionComponent,
    ContactformComponent,
    WhyChooseUsComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('appVideo') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit(): void {
    this.setupLazyVideoPlayback();
  }

  // ================================
  // PRODUCTION SAFE VIDEO HANDLING
  // ================================
  private setupLazyVideoPlayback() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            video.muted = true;
            video.playsInline = true;

            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    this.videos.forEach((videoRef) => {
      observer.observe(videoRef.nativeElement);
      this.setupFeatureSwitch(videoRef.nativeElement);
    });
  }

  // ===================================
  // SMOOTH SOURCE SWITCHING
  // ===================================
  private setupFeatureSwitch(video: HTMLVideoElement) {
    const section = video.closest('section');
    if (!section) return;

    const items = section.querySelectorAll<HTMLLIElement>('.list-group-item');

    let currentIndex = 0;

    const playIndex = (index: number) => {
      const src = items[index].dataset['video'];
      if (!src) return;

      items.forEach((li) => li.classList.remove('active'));
      items[index].classList.add('active');

      const source = video.querySelector('source')!;
      if (source.src.includes(src)) return;

      video.pause();
      source.src = src;
      video.load();

      video.onloadeddata = () => {
        video.play().catch(() => { });
      };

      currentIndex = index;
    };

    video.onended = () => {
      playIndex((currentIndex + 1) % items.length);
    };

    items.forEach((item, i) => {
      item.addEventListener('click', () => playIndex(i));
    });

    playIndex(0);
  }

  // Add these properties inside your HomeComponent class
  activeCategory: string = 'About QFREEMART';

  faqCategories: string[] = [
    'About QFREEMART',
    'Getting Started',
    'Customers',
    'Sellers',
    'Executors',
    'Orders & Queue',
    'Payments',
    'Trust & Safety'
  ];

  // This stores the state of which accordion item is open
  openIndex: number | null = 0;

  faqs = [
    // ================= ABOUT QFREEMART =================
    {
      category: 'About QFREEMART',
      q: 'What is QFREEMART?',
      a: 'QFREEMART is a hyperlocal digital commerce platform that connects customers, local sellers, and delivery partners within a defined locality, with the ability to expand the service radius based on availability, demand, and seller preferences. It enables B2C as well as B2B businesses to sell products and services digitally, allowing customers to place orders, join queues, book appointments, negotiate prices, and receive deliveries — all in one platform.'
    },
    {
      category: 'About QFREEMART',
      q: 'Who is QFREEMART for?',
      a: 'QFREEMART is for customers, sellers/service providers, and delivery/executor partners. Customers can buy locally, sellers can digitize operations, and executors can earn through local deliveries and services.'
    },
    {
      category: 'About QFREEMART',
      q: 'How is QFREEMART different from Amazon or Swiggy?',
      a: 'Unlike large marketplaces, QFREEMART focuses on local commerce instead of centralized warehouses. It supports queue-based services, appointment booking, negotiation, and direct local fulfillment designed specifically for neighborhood businesses.'
    },
    {
      category: 'About QFREEMART',
      q: 'Is QFREEMART a seller or service provider?',
      a: 'No. QFREEMART is a technology platform and does not sell products or provide services. All listed sellers and service providers are responsible for fulfillment.'
    },

    // ================= GETTING STARTED =================
    {
      category: 'Getting Started',
      q: 'Is registration mandatory?',
      a: 'Yes, registration is required to place or accept orders. It ensures secure transactions, order tracking, trust, and proper communication.'
    },
    {
      category: 'Getting Started',
      q: 'How many apps does QFREEMART have?',
      a: 'QFREEMART provides separate apps for Customers, Sellers, and Delivery/Executor Partners to keep workflows simple and efficient.'
    },
    {
      category: 'Getting Started',
      q: 'What documents are required for sellers?',
      a: 'Basic business and identity documents are required to verify legitimacy, ensure trust, and comply with legal and platform requirements.'
    },
    {
      category: 'Getting Started',
      q: 'How long does approval take?',
      a: 'Approval usually takes a short verification period. Delays may occur if documents are incomplete or unclear.'
    },

    // ================= CUSTOMERS =================
    {
      category: 'Customers',
      q: 'How do I place an order?',
      a: 'Browse nearby sellers, select a product or service, choose delivery or pickup, and confirm the order through the app.'
    },
    {
      category: 'Customers',
      q: 'What is queue-based ordering?',
      a: 'Queue-based ordering lets customers join a service queue remotely and receive a token number so they arrive only when their turn is near.'
    },
    {
      category: 'Customers',
      q: 'What is appointment-based ordering?',
      a: 'Appointment-based ordering allows customers to book a fixed time slot, suitable for services like salons, clinics, and consultations.'
    },
    {
      category: 'Customers',
      q: 'How does negotiation work?',
      a: 'Negotiation is numeric-only and time-bound. Customers submit a price offer and sellers can accept, reject, or counter. Text chat is disabled to avoid disputes.'
    },
    {
      category: 'Customers',
      q: 'Is negotiation mandatory?',
      a: 'No. Sellers can disable negotiation based on their preferences.'
    },
    {
      category: 'Customers',
      q: 'Can I cancel an order?',
      a: 'Yes, before seller acceptance. After acceptance, cancellation depends on seller-defined conditions.'
    },

    // ================= SELLERS =================
    {
      category: 'Sellers',
      q: 'How do I register my business?',
      a: 'Register through the Seller App by submitting business details, selecting service categories, and completing verification.'
    },
    {
      category: 'Sellers',
      q: 'Can I auto-accept orders?',
      a: 'Yes. Auto-accept helps reduce delays and improves customer experience.'
    },
    {
      category: 'Sellers',
      q: 'How does queue management work?',
      a: 'Sellers manage customer flow digitally by adding walk-ins, shifting queue positions, and adjusting queues in real time.'
    },
    {
      category: 'Sellers',
      q: 'Can I change queue positions manually?',
      a: 'Yes. Sellers have full control to adjust queues due to delays or special circumstances.'
    },
    {
      category: 'Sellers',
      q: 'How are commissions calculated?',
      a: 'Commission depends on the subscription plan. Longer-duration plans generally offer lower commission percentages.'
    },
    {
      category: 'Sellers',
      q: 'Will I receive invoices?',
      a: 'Yes. Invoices are generated for subscription fees, commissions, and registration charges payable to QFREEMART.'
    },

    // ================= EXECUTORS =================
    {
      category: 'Executors',
      q: 'Who are Executors on QFREEMART?',
      a: 'Executors are individuals who perform delivery or service execution, including delivery partners, technicians, helpers, or service staff.'
    },
    {
      category: 'Executors',
      q: 'How is an Executor different from a Seller?',
      a: 'Sellers manage businesses and receive orders, while Executors physically perform deliveries or services.'
    },
    {
      category: 'Executors',
      q: 'How do Executors register on QFREEMART?',
      a: 'Executors register via the Executor/Delivery app by submitting identity and verification details.'
    },
    {
      category: 'Executors',
      q: 'Is there a registration charge for Executors?',
      a: 'Yes. Registration charges may apply to cover onboarding, verification, and platform access.'
    },
    {
      category: 'Executors',
      q: 'How are orders assigned to Executors?',
      a: 'Orders are assigned based on availability, proximity, workload, and seller preferences.'
    },
    {
      category: 'Executors',
      q: 'Can Executors reject an assigned order?',
      a: 'Yes. However, frequent rejections may impact future assignments or account standing.'
    },
    {
      category: 'Executors',
      q: 'How do Executors see their tasks?',
      a: 'Tasks appear in the Executor app dashboard with real-time order and customer details.'
    },
    {
      category: 'Executors',
      q: 'How is proof of execution handled?',
      a: 'Proof includes OTP confirmation, photos, timestamps, or customer acknowledgment depending on the order.'
    },
    {
      category: 'Executors',
      q: 'When do Executors get paid?',
      a: 'Payments are processed after successful order completion and verification, as per the settlement cycle.'
    },
    {
      category: 'Executors',
      q: 'What if the customer is unavailable?',
      a: 'Executors can report the issue in the app and follow guided steps for resolution.'
    },
    {
      category: 'Executors',
      q: 'Can Executor accounts be suspended?',
      a: 'Yes. Misconduct, fraud, or repeated failures may result in temporary or permanent suspension.'
    },

    // ================= ORDERS & QUEUE =================
    {
      category: 'Orders & Queue',
      q: 'Can queue and appointment orders coexist?',
      a: 'Yes. Sellers can enable both and choose what suits each service.'
    },
    {
      category: 'Orders & Queue',
      q: 'What happens if negotiation fails?',
      a: 'The order is automatically cancelled and both parties are freed from obligation.'
    },

    // ================= PAYMENTS =================
    {
      category: 'Payments',
      q: 'What payment methods are supported?',
      a: 'Payment methods depend on region and seller configuration and may include UPI, cards, wallets, or cash on delivery.'
    },
    {
      category: 'Payments',
      q: 'Are GST invoices provided?',
      a: 'Yes. QFREEMART issues GST invoices for platform charges. Sellers issue GST invoices for their products or services if applicable.'
    },
    {
      category: 'Payments',
      q: 'What is the refund timeline?',
      a: 'Refunds are processed to the original payment method within a few working days after approval.'
    },

    // ================= TRUST & SAFETY =================
    {
      category: 'Trust & Safety',
      q: 'Is my data secure?',
      a: 'Yes. QFREEMART uses industry-standard security practices to protect user data.'
    },
    {
      category: 'Trust & Safety',
      q: 'What happens in case of disputes?',
      a: 'Disputes are reviewed based on platform policies, evidence, and transaction history, and assistance may be provided.'
    },
    {
      category: 'Trust & Safety',
      q: 'Can accounts be suspended?',
      a: 'Yes. Repeated misuse, fraud, or abuse may lead to suspension or termination.'
    }
  ];


  getFilteredFAQs() {
    return this.faqs.filter(f => f.category === this.activeCategory);
  }

  toggleAccordion(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
