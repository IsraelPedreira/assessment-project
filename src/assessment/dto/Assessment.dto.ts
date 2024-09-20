import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class AssessmentDTO{
    @IsNotEmptyObject()
    questions: {
        title: string;
        answer: string;
    }[];

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    duration: number;

    @IsNotEmpty()
    instructions: string;

    @IsNotEmpty()
    passingScore: number;
}