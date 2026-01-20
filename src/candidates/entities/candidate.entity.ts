import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type Seniority = 'junior' | 'senior';

@Entity('candidates')
export class CandidateEntity {
  @ApiProperty({
    example: '269454ca-7c2a-4d87-a6dc-51ea618158b7',
    description: 'Candidate unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'John',
    description: 'Candidate first name',
  })
  @Column()
  name!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Candidate last name',
  })
  @Column()
  surname!: string;

  @ApiProperty({
    example: 'junior',
    enum: ['junior', 'senior'],
    description: 'Candidate seniority level',
  })
  @Column({ type: 'text' })
  seniority!: Seniority;

  @ApiProperty({
    example: 5,
    description: 'Years of professional experience',
  })
  @Column('int')
  years!: number;

  @ApiProperty({
    example: true,
    description: 'Candidate availability status',
  })
  @Column('boolean')
  availability!: boolean;

  @ApiProperty({
    example: '2026-01-20T12:34:56.000Z',
    description: 'Creation timestamp',
  })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({
    example: '2026-01-20T12:40:00.000Z',
    description: 'Last update timestamp',
  })
  @UpdateDateColumn()
  updatedAt!: Date;
}
