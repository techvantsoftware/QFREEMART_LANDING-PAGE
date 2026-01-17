import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';
import * as XLSX from 'xlsx';

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

    public async deleteContact(id: string) {
        if (confirm('Are you sure you want to delete this contact?')) {
            try {
                await this.contactService.deleteContact(id);
                this.contacts = this.contacts.filter(c => c.id !== id);
                alert('Contact deleted successfully');
            } catch (error) {
                console.error('Error deleting contact:', error);
                alert('Failed to delete contact');
            }
        }
    }

    public downloadExcel() {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.contacts);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        XLSX.writeFile(workbook, 'contacts.xlsx');
    }

    public logout() {
        this.authService.logout();
    }
}
