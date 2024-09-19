import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto } from './dtos/Login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @HttpCode(201)
    @Post("register")
    register(@Body() loginDto: RegisterDto) {
        return this.authService.register(loginDto);
    }
}
