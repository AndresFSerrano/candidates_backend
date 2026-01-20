import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type Seniority = 'junior' | 'senior';

@Entity('candidates')
export class CandidateEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column({ type: 'text' })
  seniority!: Seniority;

  @Column('int')
  years!: number;

  @Column('boolean')
  availability!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
