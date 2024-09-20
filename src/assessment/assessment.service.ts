import { Injectable } from '@nestjs/common';
import { AssessmentDTO } from './dto/Assessment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssessmentEntity } from 'src/db/entities/Assessment.entity';
import { Repository } from 'typeorm';
import { QuestionEntity } from 'src/db/entities/Questions.entity';
import { UsersService } from 'src/users/users.service';
import { SubmitAssessmentDTO } from './dto/SubmitAssessment.dto';
import { AttemptEntity } from 'src/db/entities/Attempt.entity';

@Injectable()
export class AssessmentService {
    constructor(
        @InjectRepository(AssessmentEntity)
        private assessmentRepository: Repository<AssessmentEntity>,

        @InjectRepository(QuestionEntity)
        private questionRepository: Repository<QuestionEntity>,

        @InjectRepository(AttemptEntity)
        private attemptRepository: Repository<AttemptEntity>,

        private readonly usersService: UsersService
    ) {}

    async createAssessment(assessment: AssessmentDTO, userId: string) {
        const user = await this.usersService.findById(userId);

        const assessmentEntity = await this.assessmentRepository.save({
            name: assessment.name,
            description: assessment.description,
            duration: assessment.duration,
            instructions: assessment.instructions,
            user,
            passingScore: assessment.passingScore
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
        };
    }

    async submitAssessment(submission: SubmitAssessmentDTO, userId: string) {
        const user = await this.usersService.findById(userId);

        const assessment = await this.assessmentRepository.findOne({
            where: {
                id: submission.assessmentId
            }
        });

        if (!assessment) {
            throw new Error("Assessment not found");
        }

        const score = assessment.questions.reduce((acc: number, question) => {
            const findQuestion = submission.answers.find((element)=> element.questionId === question.id)
            if(findQuestion.selectedOption === question.answer){
                return acc + question.score
            }
            return acc
        }, 0)

        const attempt = await this.attemptRepository.save({
            assessment,
            user,
            answers: submission.answers,
            score,
            status: score >= assessment.passingScore * assessment.questions.length ? 'PASSED' : 'FAILED'
        });

        return {
            score,
            status: attempt.status,
            id: attempt.id
        }
    }

    async getAssessments(userId: string) {
        const user = await this.usersService.findById(userId);

        return await this.assessmentRepository.find({
            where: {
                user,
            },
        })
    }
}
