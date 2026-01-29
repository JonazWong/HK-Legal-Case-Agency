import { IDataSource, RawCase } from '../types';

export class JudiciarySource implements IDataSource {
  name = 'Judiciary';

  async fetchDailyCases(): Promise<RawCase[]> {
    // In a real implementation, we would use a headless browser or 
    // reverse-engineer the API from e-services.judiciary.hk
    console.log('Fetching daily cause list from Judiciary...');
    
    // Mock data representing cases from the daily cause list
    return [
      {
        source: 'JUDICIARY',
        externalId: 'DCL_20260129_HCCC123',
        caseNumber: 'HCCC 123/2025',
        title: 'HKSAR v. CHAN TAI MAN',
        content: 'Nature of Hearing: Trial; Court: High Court; Time: 10:00 AM',
        category: 'CRIMINAL',
        court: 'High Court',
        judge: 'Hon. Justice Wong',
        hearingDate: new Date('2026-01-29'),
        publishedAt: new Date(),
        url: 'https://e-services.judiciary.hk/dcl/index.jsp'
      }
    ];
  }
}
