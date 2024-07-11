import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfessionalController } from './professional.controller';

@Module({
    imports: [PrismaModule],
    providers: [ProfessionalService],
    exports: [ProfessionalService],
    controllers: [ProfessionalController],
})
export class ProfessionalModule { }
