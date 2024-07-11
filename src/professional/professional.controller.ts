import { Body, Controller, HttpCode, Post, ValidationPipe } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';

@Controller('professional')
export class ProfessionalController {
    constructor(private professionalService: ProfessionalService) { }

    //Endpoint para cadastrar novo profissional
    @HttpCode(200)
    @Post('/')
    async createProfessional(
        @Body(ValidationPipe) createProfessionalDto: CreateProfessionalDto,
    ): Promise<{ message: string }> {
        await this.professionalService.create(createProfessionalDto);
        return {
            message: 'Professional cadastrado com sucesso',
        };
    }
}
