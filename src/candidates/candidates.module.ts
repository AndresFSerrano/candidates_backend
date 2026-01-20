import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateEntity } from './entities/candidate.entity';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateEntity])],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
