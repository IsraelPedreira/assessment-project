import { IsNotEmpty } from "class-validator";
import { AnswerDTO } from "./Answer.dto";

export class SubmitAssessmentDTO {
    
    @IsNotEmpty()
    assessmentId: string;

    @IsNotEmpty()
    answers: AnswerDTO[];
}