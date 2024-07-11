import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaClient) { }

    create(createCompanyDto: CreateCompanyDto) {
        return this.prisma.company.create({ data: createCompanyDto })
    }

    findAll() {
        return this.prisma.company.findMany()
    }

    findOne(id: string) {
        return this.prisma.company.findUnique({
            where: { id: id }
        })
    }
}
