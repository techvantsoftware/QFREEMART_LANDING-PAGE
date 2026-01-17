import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    contacts: any[] = [];
    loading: boolean = true;

    constructor(
        private contactService: ContactService,
        private authService: AuthService
    ) { }

    async ngOnInit() {
        await this.loadContacts();
    }

    async loadContacts() {
        try {
            this.loading = true;
            this.contacts = await this.contactService.getContacts();
            // Sort by timestamp descending if available
            this.contacts.sort((a, b) => {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            });
        } catch (error) {
            console.error('Error loading contacts:', error);
        } finally {
            this.loading = false;
        }
    }

    logout() {
        this.authService.logout();
    }
}
