import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsStrongPassword()
    password: string;

    @IsEmail()
    email: string;

    role: string;
}