import { IsNotEmpty } from "class-validator";

export class AnswerDTO {
    @IsNotEmpty()
    questionId: string;

    @IsNotEmpty()
    selectedOption: string;
}