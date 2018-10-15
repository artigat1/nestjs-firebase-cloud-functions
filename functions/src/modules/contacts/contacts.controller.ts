import { Body, Controller, Get, Post } from '@nestjs/common';

import { ContactsService } from './contacts.service';
import { Contact } from './interfaces/contact.interface';

@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactsService: ContactsService) {
    }

    @Get()
    getContacts() {
        return this.contactsService.get();
    }

    @Post()
    createContact(@Body() contact: Contact) {
        return this.contactsService.create(contact);
    }
}