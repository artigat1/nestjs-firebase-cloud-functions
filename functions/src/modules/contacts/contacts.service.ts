import { Injectable } from '@nestjs/common';
import { Contact } from './interfaces/contact.interface';
import db from '../../db'

const contactsCollection = 'contacts';

@Injectable()
export class ContactsService {

    get(): Promise<Contact[]> {
        return db.collection(contactsCollection)
            .get()
            .then(snapshot => {
                const contacts: Contact[] = [];
                snapshot.forEach(contact => {
                    contacts.push(this.mapResponse(contact.data(), contact.id));
                });
                return contacts;
            })
            .catch(error => {
                this.handleError(error);
                return [];
            });
    }

    create(contact: Contact): Promise<Contact> {
        return db.collection(contactsCollection)
            .add(contact)
            .then((docRef) => {
                return {
                    ...contact,
                    id: docRef.id
                };
            })
            .catch(error => {
                this.handleError(error);
                return null;
            });
    }

    private mapResponse(data: any, id: string): Contact {
        return {
            id: id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        };
    }

    private handleError(error): void {
        throw new Error(error);
    }
}