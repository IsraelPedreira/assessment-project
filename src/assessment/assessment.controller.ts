import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AssessmentDTO } from './dto/Assessment.dto';
import { AssessmentService } from './assessment.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('assessment')
export class AssessmentController {
    constructor(private assessmentService: AssessmentService) {}

    @UseGuards(AuthGuard)
    @Post()
    createAssessment(@Body() body: AssessmentDTO, @Request() req: any) {
        return this.assessmentService.createAssessment(body, req.user.sub);
    }
}
