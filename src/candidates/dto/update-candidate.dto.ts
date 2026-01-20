import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCandidateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsIn(['junior', 'senior'])
  seniority?: 'junior' | 'senior';

  @IsOptional()
  @IsInt()
  @Min(0)
  years?: number;

  @IsOptional()
  @IsBoolean()
  availability?: boolean;
}
