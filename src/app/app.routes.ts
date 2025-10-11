import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';

export const routes: Routes = [ // <-- ADD export here
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'why-choose-us', component: WhyChooseUsComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '**', redirectTo: '' }
];
