import { Controller, Post, Body, ValidationPipe, HttpCode, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { User, Professional } from '@prisma/client';
import { AuthGuard } from './auth.guard';
import { AuthenticationDto } from './dto/authentication.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    //endpoint para cadastro de usuario profissional
    @HttpCode(200)
    @Post('/signup/professional')
    async signUpProfessional(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
        await this.authService.signUpProfessional(createUserDto);
        return {
            message: 'Cadastro realizado com sucesso',
        };
    }

    //endpoint para cadastro de usuario gerente
    @HttpCode(200)
    @Post('/signup/manager')
    async signUpManager(
        @Body(ValidationPipe) createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
        await this.authService.signUpManager(createUserDto);
        return {
            message: 'Cadastro realizado com sucesso',
        };
    }

    //endpoint para login da plataforma
    // @HttpCode(200)
    // @Post('/signin')
    // async signIn(
    //     @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    // ): Promise<Professional> {
    //     return await this.authService.signIn(credentiaslsDto);
    // }

    @HttpCode(200)
    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    ): Promise<Professional> {
        return await this.authService.signIn(credentiaslsDto);
    }

    //@UseGuards(AuthGuard)

    //endpoint para criação do token de autenticação
    @HttpCode(200)
    @Post('/token')
    async token(
        @Body(ValidationPipe) authenticationDto: AuthenticationDto,
    ): Promise<{ token: string }> {
        return await this.authService.createToken(authenticationDto);
    }

}