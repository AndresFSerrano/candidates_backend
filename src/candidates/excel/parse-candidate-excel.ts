import * as XLSX from 'xlsx';

export type ExcelCandidateData = {
  seniority: 'junior' | 'senior';
  years: number;
  availability: boolean;
};

export function parseCandidateExcel(buffer: Buffer): ExcelCandidateData {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error('Excel has no sheets');
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: null,
  });

  if (rows.length !== 1) {
    throw new Error('Excel must contain exactly one row');
  }

  const row = rows[0];

  const seniority = String(row['Seniority']).toLowerCase();
  if (!['junior', 'senior'].includes(seniority)) {
    throw new Error('Invalid seniority');
  }

  const years = Number(row['Years of experience']);
  if (!Number.isInteger(years) || years < 0) {
    throw new Error('Invalid years of experience');
  }

  const availability = Boolean(row['Availability']);

  return {
    seniority: seniority as 'junior' | 'senior',
    years,
    availability,
  };
}
