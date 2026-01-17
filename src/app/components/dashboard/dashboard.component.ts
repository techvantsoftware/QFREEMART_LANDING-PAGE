import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    contacts: any[] = [];
    loading: boolean = true;

    // UI State
    searchTerm: string = '';
    isCardView: boolean = false;

    // Pagination
    currentPage: number = 1;
    pageSize: number = 6; // Cards per page

    constructor(
        private contactService: ContactService,
        private authService: AuthService,
        private toastService: ToastService
    ) { }

    async ngOnInit() {
        await this.loadContacts();
    }

    async loadContacts() {
        try {
            this.loading = true;
            this.contacts = await this.contactService.getContacts();
            // Sort by timestamp descending
            this.contacts.sort((a, b) => {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            });
        } catch (error) {
            console.error('Error loading contacts:', error);
            this.toastService.error('Failed to load contacts');
        } finally {
            this.loading = false;
        }
    }

    // Getters for filtered and paginated data
    get filteredContacts() {
        if (!this.searchTerm.trim()) {
            return this.contacts;
        }
        const term = this.searchTerm.toLowerCase();
        return this.contacts.filter(contact =>
            (contact.firstName?.toLowerCase() || '').includes(term) ||
            (contact.lastName?.toLowerCase() || '').includes(term) ||
            (contact.subject?.toLowerCase() || '').includes(term) ||
            (contact.message?.toLowerCase() || '').includes(term)
        );
    }

    get paginatedContacts() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.filteredContacts.slice(startIndex, startIndex + this.pageSize);
    }

    get totalPages() {
        return Math.ceil(this.filteredContacts.length / this.pageSize);
    }

    get pagesArray() {
        return Array(this.totalPages).fill(0).map((x, i) => i + 1);
    }

    // Actions
    toggleView(isCard: boolean) {
        this.isCardView = isCard;
        this.currentPage = 1; // Reset to first page on view switch
    }

    onSearch() {
        this.currentPage = 1; // Reset to first page on new search
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    public async deleteContact(id: string) {
        const confirmed = await this.toastService.confirm('You won\'t be able to revert this!', 'Are you sure?');
        if (confirmed) {
            try {
                await this.contactService.deleteContact(id);
                this.contacts = this.contacts.filter(c => c.id !== id);
                this.toastService.success('Contact has been deleted.', 'Deleted!');

                // Adjust pagination if page becomes empty
                if (this.paginatedContacts.length === 0 && this.currentPage > 1) {
                    this.currentPage--;
                }
            } catch (error) {
                console.error('Error deleting contact:', error);
                this.toastService.error('Failed to delete contact.');
            }
        }
    }

    public downloadExcel() {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredContacts);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        XLSX.writeFile(workbook, 'contacts.xlsx');
    }

    public logout() {
        this.authService.logout();
    }
}
