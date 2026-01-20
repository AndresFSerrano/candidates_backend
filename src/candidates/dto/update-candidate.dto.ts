import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCandidateDto {
  @ApiPropertyOptional({
    example: 'Jane',
    description: 'Candidate first name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Candidate last name',
  })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiPropertyOptional({
    example: 'senior',
    enum: ['junior', 'senior'],
    description: 'Candidate seniority level',
  })
  @IsOptional()
  @IsIn(['junior', 'senior'])
  seniority?: 'junior' | 'senior';

  @ApiPropertyOptional({
    example: 10,
    description: 'Years of professional experience',
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  years?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Candidate availability status',
  })
  @IsOptional()
  @IsBoolean()
  availability?: boolean;
}
