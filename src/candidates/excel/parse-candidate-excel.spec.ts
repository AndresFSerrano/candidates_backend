import * as XLSX from 'xlsx';
import { parseCandidateExcel } from './parse-candidate-excel';

function createExcelBuffer(data: Record<string, unknown>[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  return XLSX.write(workbook, { type: 'buffer' });
}

describe('parseCandidateExcel', () => {
  it('should parse a valid excel file', () => {
    const buffer = createExcelBuffer([
      {
        Seniority: 'junior',
        'Years of experience': 5,
        Availability: true,
      },
    ]);

    const result = parseCandidateExcel(buffer);

    expect(result).toEqual({
      seniority: 'junior',
      years: 5,
      availability: true,
    });
  });

  it('should throw if excel has no rows', () => {
    const buffer = createExcelBuffer([]);

    expect(() => parseCandidateExcel(buffer)).toThrow(
      'Excel must contain exactly one row',
    );
  });

  it('should throw if excel has more than one row', () => {
    const buffer = createExcelBuffer([
      {
        Seniority: 'junior',
        'Years of experience': 3,
        Availability: true,
      },
      {
        Seniority: 'senior',
        'Years of experience': 10,
        Availability: false,
      },
    ]);

    expect(() => parseCandidateExcel(buffer)).toThrow(
      'Excel must contain exactly one row',
    );
  });

  it('should throw if seniority is invalid', () => {
    const buffer = createExcelBuffer([
      {
        Seniority: 'mid',
        'Years of experience': 3,
        Availability: true,
      },
    ]);

    expect(() => parseCandidateExcel(buffer)).toThrow('Invalid seniority');
  });

  it('should throw if years of experience is invalid', () => {
    const buffer = createExcelBuffer([
      {
        Seniority: 'junior',
        'Years of experience': -1,
        Availability: true,
      },
    ]);

    expect(() => parseCandidateExcel(buffer)).toThrow(
      'Invalid years of experience',
    );
  });
});
