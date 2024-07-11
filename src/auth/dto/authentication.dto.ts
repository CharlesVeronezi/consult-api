import { IsNotEmpty } from "class-validator";

export class AuthenticationDto {
    jwt: string;

    @IsNotEmpty({
        message: 'companyId precisa ser referenciado',
    })
    companyId: string
}