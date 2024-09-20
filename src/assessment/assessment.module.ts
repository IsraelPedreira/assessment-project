import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { AssessmentEntity } from 'src/db/entities/Assessment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/db/entities/Questions.entity';
import { UsersModule } from 'src/users/users.module';
import { AttemptEntity } from 'src/db/entities/Attempt.entity';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService],
  imports: [TypeOrmModule.forFeature([AssessmentEntity, QuestionEntity, AttemptEntity]), UsersModule],
})
export class AssessmentModule {}
