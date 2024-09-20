import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AssessmentEntity } from "./Assessment.entity";
import { AttemptEntity } from "./Attempt.entity";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: 'student' })
    role: string;

    @OneToMany(() => AssessmentEntity, (assessment) => assessment.user)
    assessments: AssessmentEntity[];

    @OneToMany(() => AttemptEntity, (attempt) => attempt.user)
    attempts: AttemptEntity[];
}