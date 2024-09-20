import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AssessmentEntity } from "./Assessment.entity";
import { UserEntity } from "./User.entity";

@Entity({ name: 'attempts' })
export class AttemptEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    score: number;

    @Column()
    status: string;

    @ManyToOne(() => AssessmentEntity, (assessment) => assessment.attempts)
    assessment: AssessmentEntity;

    @ManyToOne(() => UserEntity, (user) => user.attempts)
    user: UserEntity;
}