import { createPrivateAxiosInstance } from './comman.helper';
import {
  getChaptersApiInterface,
  getConceptsApiInterface,
  getTestsApiParamsInterface,
} from 'app/types/api.params.types';
import { AssignTestProps } from 'app/types/concept.screen.types';

export async function getClasses() {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get('batches');
}

export async function getChapters(queryParams: getChaptersApiInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  const { subjectIds, batchId } = queryParams;
  return await privateAxiosInstance.get(
    'batches/' + batchId + '/syllabus/chapter?' + subjectIds,
  );
}

export async function getStudents({
  subjectIds,
  batchId,
}: getChaptersApiInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    'batches/' + batchId + '/students?' + subjectIds,
  );
}

export async function getConcept({
  chapterIds,
  batchId,
}: getConceptsApiInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    'batches/' + batchId + '/syllabus/concept?' + chapterIds,
  );
}

export async function getTests({
  conceptIds,
  batchId,
  mode,
}: getTestsApiParamsInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    `batch/${batchId}/tests/concept/${conceptIds}?mode=${mode}`,
  );
}

export async function handleTestAssign(params: AssignTestProps) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post('/tests/assignTest', params);
}
