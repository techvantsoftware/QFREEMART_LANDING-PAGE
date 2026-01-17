import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private db: any;

    constructor() {
        const app = initializeApp(environment.firebaseConfig);
        this.db = getDatabase(app);
    }

    async submitContactForm(data: any): Promise<void> {
        try {
            const contactsRef = ref(this.db, 'contacts');
            const newContactRef = push(contactsRef);
            await set(newContactRef, {
                ...data,
                timestamp: new Date().toISOString()
            });
            console.log('Data saved successfully to Realtime Database');
        } catch (e) {
            console.error('Error saving data: ', e);
            throw e;
        }
    }
}
