import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async findOne(email: string) {
        const userEntity = await this.userRepository.findOne({ where: { email } });

        return this.entityToDto(userEntity);
    }

    async create(user: UserEntity) {
        return this.userRepository.save(user);
    }

    async findById(id: string) {
        const userEntity = await this.userRepository.findOne({where: {id}});

        return this.entityToDto(userEntity);
    } 

    entityToDto(user: UserEntity) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role
        };
    }

}
