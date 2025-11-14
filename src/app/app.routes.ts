import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';

export const routes: Routes = [ // <-- ADD export here
  { path: '', component: HomeComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '**', redirectTo: '' }
];
