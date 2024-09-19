import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { AssessmentEntity } from 'src/db/entities/Assessment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/db/entities/Questions.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService],
  imports: [TypeOrmModule.forFeature([AssessmentEntity, QuestionEntity]), UsersModule],
})
export class AssessmentModule {}
