import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty({
        message: 'Informe o nome do usuário',
    })
    @MaxLength(200, {
        message: 'O nome deve ter menos de 200 caracteres',
    })
    name: string;

    @IsNotEmpty({
        message: 'Informe um endereço',
    })
    @MaxLength(512, {
        message: 'O endereço deve ter no máximo 512 caracteres',
    })
    address: string

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
        message: 'Informe um CNPJ',
    })
    @MaxLength(14, {
        message: 'O CNPJ deve ter no máximo 14 caracteres',
    })
    @MinLength(13, {
        message: 'O CNPJ deve ter no mínimo 14 números',
    })
    cnpj: string

}