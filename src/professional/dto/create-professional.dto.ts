import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateProfessionalDto {
    @IsNotEmpty({
        message: 'Informe o nome do usuário',
    })
    @MaxLength(200, {
        message: 'O nome deve ter menos de 200 caracteres',
    })
    name: string;

    @IsNotEmpty({
        message: 'Informe um endereço de email',
    })
    @IsEmail(
        {},
        {
            message: 'Informe um endereço de email válido',
        },
    )
    @MaxLength(200, {
        message: 'O endereço de email deve ter menos de 200 caracteres',
    })
    email: string;

    @IsNotEmpty({
        message: 'Informe um telefone',
    })
    @MaxLength(11, {
        message: 'O telefone deve ter no máximo 11 números',
    })
    @MinLength(10, {
        message: 'O telefone deve ter no mínimo 10 números',
    })
    telephone: string

    @IsNotEmpty({
        message: 'Informe um CPF',
    })
    @MaxLength(11, {
        message: 'O cpf deve ter no máximo 11 caracteres',
    })
    @MinLength(11, {
        message: 'O cpf deve ter no mínimo 11 números',
    })
    cpf: string

    @IsNotEmpty({
        message: 'companyId precisa ser referenciado',
    })
    companyId: string

    @IsNotEmpty({
        message: 'companyId precisa ser referenciado',
    })
    userId: string

}