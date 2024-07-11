import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaClient) { }

    async createUser(createUserDto: CreateUserDto, role: UserRole): Promise<User> {
        const { email, name, password } = createUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(password, salt);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    role: role,
                    status: true,
                    confirmationToken: crypto.randomBytes(32).toString('hex'),
                    salt,
                    password: hashedPassword,
                },
            });

            const { password: _, salt: __, ...result } = user; // Remove sensitive fields before returning
            return {
                ...result,
                password: undefined,
                salt: undefined,
            };
        } catch (error) {
            if (error.code === 'P2002' && error.meta?.target.includes('email')) {
                throw new ConflictException('Endereço de email já está em uso');
            } else {
                throw new InternalServerErrorException('Erro ao salvar o usuário no banco de dados');
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async findOneByEmail(email: string, status: boolean): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email, status },
        });
    }

    async checkCredentials(credentialsDto: CredentialsDto): Promise<User | null> {
        const { email, password } = credentialsDto;
        const user = await this.findOneByEmail(email, true);

        if (user && await this.checkPassword(password, user.password, user.salt)) {
            return user;
        } else {
            return null;
        }
    }

    private async checkPassword(password: string, hashedPassword: string, salt: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, salt);
        return hash === hashedPassword;
    }

}
