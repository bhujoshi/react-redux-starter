export interface conceptScreenUrlParamInterface {
  batchId?: string;
  chapterIds?: string;
  parentIds?: string;
  batchName?: string;
  chapterName?: string;
}

export interface AssignTestProps {
  batchId: string;
  type: string;
  typeId: string;
  teacherName: string | null;
  testTypeId: string;
  newLockValue: boolean;
}
