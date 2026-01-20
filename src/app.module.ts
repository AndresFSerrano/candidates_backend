import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'candidates.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CandidatesModule,
  ],
})
export class AppModule {}
