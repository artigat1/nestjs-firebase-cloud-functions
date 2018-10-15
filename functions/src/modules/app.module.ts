import { Module } from '@nestjs/common';

import { ContactModule } from './contacts/contacts.module';

@Module({
    imports: [ContactModule]
})
export class ApplicationModule {}