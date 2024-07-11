import { Body, Controller, Get, HttpCode, Param, Post, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    //Endpoint para cadastrar nova empresa
    @HttpCode(200)
    @Post('/')
    async createProfessional(
        @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    ): Promise<{ message: string }> {
        await this.companyService.create(createCompanyDto);
        return {
            message: 'Empresa cadastrado com sucesso',
        };
    }

    //Endpoint para buscar todas as empresas
    @Get()
    async findAll(){
        return await this.companyService.findAll();
    }

    //Endpoint para buscar uma empresa pelo id
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.companyService.findOne(id);
    }
}
