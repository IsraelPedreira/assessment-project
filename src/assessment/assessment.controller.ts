import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AssessmentDTO } from './dto/Assessment.dto';
import { AssessmentService } from './assessment.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('assessment')
export class AssessmentController {
    constructor(private assessmentService: AssessmentService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Teacher, Role.Admin)
    @Post()
    createAssessment(@Body() body: AssessmentDTO, @Request() req: any) {
        return this.assessmentService.createAssessment(body, req.user.sub);
    } 
}
