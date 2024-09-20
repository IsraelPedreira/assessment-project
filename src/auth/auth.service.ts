import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/Login.dto';
import { UserEntity } from 'src/db/entities/User.entity';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const user = await this.usersService.findOne(loginDto.email);

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.pasword);

        if(!isPasswordValid){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { email: user.email, sub: user.id, role: user.role };

        return{
            token: this.jwtService.sign(payload)
        }
        
    }

    async register(registerDto: RegisterDto){
        //Verify if already exists
        const user = await this.usersService.findOne(registerDto.email);

        if(user){
            throw new HttpException('User already exists', HttpStatus.CONFLICT)
        }

        //Create new user
        const newUser = new UserEntity();
        newUser.email = registerDto.email;
        newUser.password = await bcrypt.hash(registerDto.password, 10);
        newUser.username = registerDto.username;
        newUser.role = registerDto.role;
        
        await this.usersService.create(newUser);

    }
}
