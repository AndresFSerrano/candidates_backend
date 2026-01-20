import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCandidateDto {
  @ApiProperty({
    example: 'John',
    description: 'Candidate first name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Candidate last name',
  })
  @IsString()
  @IsNotEmpty()
  surname!: string;
}
