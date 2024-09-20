import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./Questions.entity";
import { UserEntity } from "./User.entity";
import { AttemptEntity } from "./Attempt.entity";

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

    @OneToMany(() => QuestionEntity, (question) => question.assessment, {
        eager: true
    })
    questions: QuestionEntity[];

    @ManyToOne(() => UserEntity, (user) => user.assessments)
    user: UserEntity;
    
    @OneToMany(() => AttemptEntity, (attempt) => attempt.assessment)
    attempts: AttemptEntity[];

    @Column({ type: "float" , default: 0.5 })
    passingScore: number;
}