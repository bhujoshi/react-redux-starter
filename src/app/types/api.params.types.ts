export interface loginUserParamsInterface {
  empCode: string;
  password: string;
  orgId: string;
}

export interface getConceptsApiInterface {
  batchId: string;
  chapterIds: string;
}

export interface getChaptersApiInterface {
  batchId: string;
  subjectIds: string;
}

export interface getTestsApiParamsInterface {
  batchId: string;
  conceptIds: string;
  mode: 'list' | 'data';
}
