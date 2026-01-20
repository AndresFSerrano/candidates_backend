import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

describe('CandidatesController', () => {
  let controller: CandidatesController;
  let service: jest.Mocked<CandidatesService>;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        {
          provide: CandidatesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(CandidatesController);
    service = module.get(CandidatesService) as jest.Mocked<CandidatesService>;
  });

  afterEach(() => jest.clearAllMocks());

  it('should create a candidate', async () => {
    const dto = { name: 'John', surname: 'Doe' };
    const file = { buffer: Buffer.from('excel') } as Express.Multer.File;

    service.create.mockResolvedValue({ id: '1' } as any);

    const result = await controller.create(dto as any, file);

    expect(service.create).toHaveBeenCalledWith(dto, file.buffer);
    expect(result).toEqual({ id: '1' });
  });

  it('should throw if file is missing on create', () => {
    const dto = { name: 'John', surname: 'Doe' };

    expect(() => controller.create(dto as any, undefined)).toThrow(
      BadRequestException,
    );
  });

  it('should return all candidates', async () => {
    service.findAll.mockResolvedValue([{ id: '1' }] as any);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([{ id: '1' }]);
  });

  it('should return a candidate by id', async () => {
    service.findOne.mockResolvedValue({ id: '1' } as any);

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(result).toEqual({ id: '1' });
  });

  it('should update a candidate', async () => {
    const dto = { seniority: 'senior' };

    service.update.mockResolvedValue({ id: '1', seniority: 'senior' } as any);

    const result = await controller.update('1', dto as any);

    expect(service.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual({ id: '1', seniority: 'senior' });
  });

  it('should delete a candidate', async () => {
    service.remove.mockResolvedValue(undefined);

    const result = await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith('1');
    expect(result).toEqual({ deleted: true });
  });
});
