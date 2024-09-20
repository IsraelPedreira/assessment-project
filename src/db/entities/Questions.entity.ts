import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AssessmentEntity } from "./Assessment.entity";

@Entity({ name: 'questions' })
export class QuestionEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    answer: string;

    @Column({default: 1})
    score: number;

    @ManyToOne(() => AssessmentEntity, (assessment) => assessment.questions)
    assessment: AssessmentEntity;
}