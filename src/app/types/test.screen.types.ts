import { API_STATE } from 'app/stores/api.reducer';

interface submissionsInterface {
  total: number;
  count: number;
}

interface statsInterface {
  submissions: submissionsInterface;
  attempted: boolean;
  proficiency: string;
}
export interface testInterface {
  id: string;
  name: string;
  courseId: string;
  duration: number;
  totalMarks: number;
  questionsCount: number;
  syllabus: string;
  stats?: statsInterface;
}

export interface testsDataInterface {
  apiState: API_STATE;
  data: testInterface[];
  error: string;
}
