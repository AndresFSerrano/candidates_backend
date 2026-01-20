import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidatesService } from './candidates.service';
import { CandidateEntity } from './entities/candidate.entity';
import { parseCandidateExcel } from './excel/parse-candidate-excel';

jest.mock('./excel/parse-candidate-excel');

describe('CandidatesService', () => {
  let service: CandidatesService;
  let repo: jest.Mocked<Repository<CandidateEntity>>;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CandidatesService,
        {
          provide: getRepositoryToken(CandidateEntity),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(CandidatesService);
    repo = module.get(getRepositoryToken(CandidateEntity));
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create and save a candidate', async () => {
      (parseCandidateExcel as jest.Mock).mockReturnValue({
        seniority: 'junior',
        years: 5,
        availability: true,
      });

      const dto = { name: 'John', surname: 'Doe' };
      const buffer = Buffer.from('excel');

      repo.create.mockReturnValue({ id: '1' } as any);
      repo.save.mockResolvedValue({ id: '1' } as any);

      const result = await service.create(dto as any, buffer);

      expect(parseCandidateExcel).toHaveBeenCalledWith(buffer);
      expect(repo.create).toHaveBeenCalledWith({
        name: 'John',
        surname: 'Doe',
        seniority: 'junior',
        years: 5,
        availability: true,
      });
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });

    it('should throw BadRequestException if excel is invalid', async () => {
      (parseCandidateExcel as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid excel');
      });

      await expect(
        service.create(
          { name: 'John', surname: 'Doe' } as any,
          Buffer.from(''),
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return candidates ordered by createdAt DESC', async () => {
      repo.find.mockResolvedValue([{ id: '1' }] as any);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual([{ id: '1' }]);
    });
  });

  describe('findOne', () => {
    it('should return candidate when found', async () => {
      repo.findOneBy.mockResolvedValue({ id: '1' } as any);

      const result = await service.findOne('1');

      expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual({ id: '1' });
    });

    it('should throw NotFoundException when candidate does not exist', async () => {
      repo.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should merge and save candidate', async () => {
      const candidate = { id: '1' };

      repo.findOneBy.mockResolvedValue(candidate as any);
      repo.merge.mockReturnValue({ id: '1', seniority: 'senior' } as any);
      repo.save.mockResolvedValue({ id: '1', seniority: 'senior' } as any);

      const result = await service.update('1', { seniority: 'senior' } as any);

      expect(repo.merge).toHaveBeenCalledWith(candidate, {
        seniority: 'senior',
      });
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual({ id: '1', seniority: 'senior' });
    });
  });

  describe('remove', () => {
    it('should remove candidate', async () => {
      const candidate = { id: '1' };

      repo.findOneBy.mockResolvedValue(candidate as any);
      repo.remove.mockResolvedValue(candidate as any);

      await service.remove('1');

      expect(repo.remove).toHaveBeenCalledWith(candidate);
    });
  });
});
