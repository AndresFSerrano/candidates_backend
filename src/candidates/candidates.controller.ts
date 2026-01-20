import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CandidateEntity } from './entities/candidate.entity';

@ApiTags('Candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly service: CandidatesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'surname', 'file'],
      properties: {
        name: {
          type: 'string',
          example: 'John',
        },
        surname: {
          type: 'string',
          example: 'Doe',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Excel (.xlsx) file with candidate data',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Candidate created successfully',
    type: CandidateEntity,
  })
  @ApiBadRequestResponse({
    description: 'Excel file is required or invalid',
  })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateCandidateDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Excel file is required');
    }
    return this.service.create(dto, file.buffer);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of candidates',
    type: [CandidateEntity],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Candidate UUID',
  })
  @ApiOkResponse({
    description: 'Candidate found',
    type: CandidateEntity,
  })
  @ApiNotFoundResponse({
    description: 'Candidate not found',
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Candidate UUID',
  })
  @ApiOkResponse({
    description: 'Candidate updated successfully',
    type: CandidateEntity,
  })
  @ApiNotFoundResponse({
    description: 'Candidate not found',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCandidateDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Candidate UUID',
  })
  @ApiOkResponse({
    description: 'Candidate deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Candidate not found',
  })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return { deleted: true };
  }
}
