import { Injectable } from '@nestjs/common';
import { AssessmentDTO } from './dto/Assessment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssessmentEntity } from 'src/db/entities/Assessment.entity';
import { Repository } from 'typeorm';
import { QuestionEntity } from 'src/db/entities/Questions.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AssessmentService {
    constructor(
        @InjectRepository(AssessmentEntity)
        private assessmentRepository: Repository<AssessmentEntity>,

        @InjectRepository(QuestionEntity)
        private questionRepository: Repository<QuestionEntity>,

        private readonly usersService: UsersService
    ) {}

    async createAssessment(assessment: AssessmentDTO, userId: string) {
        const user = await this.usersService.findById(userId);

        const assessmentEntity = await this.assessmentRepository.save({
            name: assessment.name,
            description: assessment.description,
            duration: assessment.duration,
            instructions: assessment.instructions,
            user
        });

        const questions = assessment.questions.map((question) => {
            return {
                title: question.title,
                answer: question.answer,
                assessment: assessmentEntity
            }
        });

        await this.questionRepository.save(questions);

        return {
            ...assessmentEntity,
            questions
        } ;

    }

}
