import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProfessionalDto } from './dto/create-professional.dto';

@Injectable()
export class ProfessionalService {
    constructor(private prisma: PrismaClient) { }

    findOne(id: string) {
        return this.prisma.professional.findUnique({
            where: {
                userId: id
            }
        });
    }

    create(createProfessionalDto: CreateProfessionalDto) {
        return this.prisma.professional.create({ data: createProfessionalDto })
    }
}
