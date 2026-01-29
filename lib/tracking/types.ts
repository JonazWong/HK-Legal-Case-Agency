export interface RawCase {
  source: string;
  externalId?: string;
  caseNumber?: string;
  title: string;
  content: string;
  category?: string;
  court?: string;
  judge?: string;
  hearingDate?: Date;
  publishedAt?: Date;
  url?: string;
  tags?: string[];
}

export interface IDataSource {
  name: string;
  fetchDailyCases(): Promise<RawCase[]>;
}
