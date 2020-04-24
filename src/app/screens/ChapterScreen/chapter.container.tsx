import { connect } from 'react-redux';

import ChapterScreen from './chapter.screen';
import { ROUTE_TYPE } from '../../constants/route.constant';
import AuthHoc from '../../components/hoc/auth.hoc';
import { chapterActions, studentActions } from './chapter.reducer';
// TODO - add state type later
const mapState = (state: any) => {
  return {
    chapters: state.chapter.chapters,
    students: state.chapter.students,
  };
};
//@ts-ignore
const mapDispatch = {
  resetChaptersApi: chapterActions['chaptersInit'],
  resetStudentsApi: studentActions['studentsInit'],
};
const authLayer = AuthHoc({ type: ROUTE_TYPE.private, screen: ChapterScreen });
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
