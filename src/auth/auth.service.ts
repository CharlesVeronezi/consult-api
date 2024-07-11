import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserRole } from '../users/user-roles.enum';
import { UsersService } from '../users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { ProfessionalService } from '../professional/professional.service'
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from './dto/authentication.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private professionalService: ProfessionalService,
        private jwtService: JwtService,
        private prisma: PrismaClient
    ) { }

    async signUpProfessional(createUserDto: CreateUserDto): Promise<any> {
        if (createUserDto.password !== createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        }

        const existingUser = await this.usersService.findOneByEmail(createUserDto.email, true);
        if (existingUser) {
            throw new UnprocessableEntityException('Endereço de email já está em uso');
        }

        try {
            const user = await this.usersService.createUser(createUserDto, UserRole.PROFESSIONAL);
            return user;
        } catch (error) {
            throw new UnprocessableEntityException('Erro ao criar o usuário');
        }
    }

    async signUpManager(createUserDto: CreateUserDto): Promise<any> {
        if (createUserDto.password !== createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        }

        const existingUser = await this.usersService.findOneByEmail(createUserDto.email, true);
        if (existingUser) {
            throw new UnprocessableEntityException('Endereço de email já está em uso');
        }

        try {
            const user = await this.usersService.createUser(createUserDto, UserRole.MANAGER);
            return user;
        } catch (error) {
            throw new UnprocessableEntityException('Erro ao criar o usuário');
        }
    }

    async signIn(credentialsDto: CredentialsDto) {
        const user = await this.usersService.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const professional = await this.professionalService.findOne(user.id)
        if (professional === null) {
            throw new NotFoundException('Nenhum profissional encontrado');
        }

        return professional;
    }

    async createToken(authenticationDto: AuthenticationDto) {
        try {
            const jwtPayload = {
                id: authenticationDto.companyId,
            };

            //Gera um jwt a partir do id da empresa
            const token = await this.jwtService.sign(jwtPayload);

            //Faz o insert na tabela authentication antes de retornar o token
            const insertDb = await this.prisma.authentication.create({
                data: {
                    ...authenticationDto,
                    jwt: token
                }
            })

            if (insertDb) {
                return { token };
            } else {
                throw new ForbiddenException('Erro ao criar o token');
            }

        } catch (error) {
            throw new UnprocessableEntityException('Erro ao gerar o token');
        }

    }
}

