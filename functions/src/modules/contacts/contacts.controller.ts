import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ContactsService } from './contacts.service';
import { Contact } from './dto/contact.model';
import { ContactValidationPipe } from './pipes/contact-validation.pipe';


/**
 * Controller for managing contacts
 */
@Controller('contacts')
export class ContactsController {

    /**
     * Instantiates a new instance of the {@link ContactsController} class.
     * @param contactsService
     */
    constructor(private readonly contactsService: ContactsService) {
    }

    /**
     * Get all stored contacts.
     */
    @ApiOperation({ title: 'Get all stored contacts.' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns the array of contacts.'
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'An error occurred while retrieving the contacts.'
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    async getContacts() {
        return this.contactsService
            .get()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    /**
     * Get a single contact using the id from the url.
     * @example
     *      http://localhost:5000/contacts/3mPvscUsYeeKHTxmMRUC
     * @param id
     */
    @ApiOperation({ title: 'Gets a single contact by it\'s id' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Returns the contact details.'
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'An error occurred while retrieving the contact.'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'No id was supplied when making the request.'
    })
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getContactById(@Param('id') id: string) {
        if (!id) {
            throw new HttpException('Bad Request: No id.', HttpStatus.BAD_REQUEST);
        }

        return this.contactsService
            .getById(id)
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    /**
     * Creates a new contact from the json object in the body of the request.
     * @example
     *   {
     *      "firstName": "Bierra",
     *      "lastName": "Moretti",
     *      "email": "bierre.morettir@beer.com"
     *  }
     * @param contact
     */
    @ApiOperation({ title: 'Create a new contact' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The contact has been successfully created.'
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'An error occurred while creating the new contact.'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Validation error on the request.'
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UsePipes(new ContactValidationPipe())
    async createContact(@Body() contact: Contact) {
        return this.contactsService
            .create(contact)
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}