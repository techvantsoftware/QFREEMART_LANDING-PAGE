import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
<<<<<<< Updated upstream
import { getDatabase, ref, push, set } from 'firebase/database';
=======
import { getDatabase, ref, push, set, get, child } from 'firebase/database';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

    async getContacts(): Promise<any[]> {
        try {
            const dbRef = ref(this.db);
            const snapshot = await get(child(dbRef, 'contacts'));
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Convert object of objects to array of objects
                return Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
            } else {
                console.log("No data available");
                return [];
            }
        } catch (error) {
            console.error("Error getting data:", error);
            throw error;
        }
    }
>>>>>>> Stashed changes
}
