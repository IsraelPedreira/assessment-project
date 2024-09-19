import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./Questions.entity";
import { UserEntity } from "./User.entity";

@Entity({ name: 'assessments' })
export class AssessmentEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    duration: number;

    @Column()
    instructions: string;

    @OneToMany(() => QuestionEntity, (question) => question.assessment)
    questions: QuestionEntity[];

    @ManyToOne(() => UserEntity, (user) => user.assessments)
    user: UserEntity;
}