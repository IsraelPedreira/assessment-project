export class AssessmentDTO{
    questions: {
        title: string;
        answer: string;
    }[];
    name: string;
    description: string;
    duration: number;
    instructions: string;
}