import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateEntity } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { parseCandidateExcel } from './excel/parse-candidate-excel';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(CandidateEntity)
    private readonly repo: Repository<CandidateEntity>,
  ) {}

  async create(dto: CreateCandidateDto, fileBuffer: Buffer) {
    let excelData;
    try {
      excelData = parseCandidateExcel(fileBuffer);
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }

    const candidate = this.repo.create({
      name: dto.name,
      surname: dto.surname,
      seniority: excelData.seniority,
      years: excelData.years,
      availability: excelData.availability,
    });

    return this.repo.save(candidate);
  }

  async findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const candidate = await this.repo.findOneBy({ id });
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
    return candidate;
  }

  async update(id: string, dto: UpdateCandidateDto) {
    const candidate = await this.findOne(id);

    const updated = this.repo.merge(candidate, dto);
    return this.repo.save(updated);
  }

  async remove(id: string) {
    const candidate = await this.findOne(id);
    await this.repo.remove(candidate);
  }
}
