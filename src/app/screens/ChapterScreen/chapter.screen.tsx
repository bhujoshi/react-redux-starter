import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/common/header.component';
import CommonListCardComponent from '../../components/common/common.list.card.component';
import StudentCardComponent from '../../components/common/studentCard.component';
import { Container, InputContainer } from '../../components';
import styled from 'styled-components';
import { getStudents, getChapters } from '../../helpers/private.api.helper';
import { getUsersCoursesFromStorage } from '../../helpers/local.storage.helper';
import { useHistory, useParams } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';
import { EmptyState } from '../../components/common/emptyState.component';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  filterData,
  sortProficiencyFunction,
  IListObj,
  IChapter,
  IStudent,
  isLoading,
  isApiFailed,
  titleCase,
} from '../../helpers/comman.helper';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchChapters, fetchStudents } from './chapter.sagas';
import { chapterScreenUrlParamInterface } from 'app/types/chapter.screen.types';
import SimpleSnackbar from 'app/components/common/snackbar.component';

interface IProps {
  chapters: IListObj;
  students: IListObj;
  resetChaptersApi: any;
  resetStudentsApi: any;
}

const useStyles = makeStyles({
  searchBatchStyle: {
    padding: '5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
  },
  styledBreadcrumbs: {
    padding: '1em 0 0 0',
    fontSize: '12px',
    color: '#fff',
    '& .MuiBreadcrumbs-separator': {
      margin: 0,
    },
    '& .MuiTypography-colorPrimary': {
      color: '#fff',
    },
    '& .MuiLink-underlineHover': {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
  link: {
    cursor: 'pointer',
  },
});

const ChapterScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  /* height: calc(100vh - 70px); */
  /* overflow: scroll; */
  padding-bottom: 2em;
`;

const CardHeader = styled.div`
  min-height: 165px;
  background-color: var(--brand-color);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
  }
`;

const TabHeader = styled.div`
  margin-top: -5em;
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    li {
      margin-right: 1em;
      opacity: 0.5;
      cursor: pointer;
    }
  }

  .active {
    border-bottom: 1px solid #fff;
    opacity: 1;
    line-height: 40px;
    pointer-events: none;
  }
`;

const CardListing = styled.div`
  background-color: #fff;
  margin-top: 1em;
  color: var(--text-color);
  border-radius: 4px;
`;

const ClassCount = styled.div`
  font-size: 1.5em;
  /* margin-top: 1em; */
`;

const BackIcon = styled.span`
  cursor: pointer;
  width: 26px;
  height: 21px;
  margin: 0 1em 0 0;
`;

const SearchIconEdit = styled(SearchIcon)`
  fill: #1d7dea !important;
`;

function getData(data: any[], searchText: string) {
  let finalData: any[] = [];
  finalData = filterData({
    data: data,
    filter: { key: 'name', value: searchText },
  });
  finalData = sortProficiencyFunction(finalData);
  return finalData;
}

const Breadcrumb = (
  params: chapterScreenUrlParamInterface,
  history: any,
  classes: any,
) => {
  const { batchName } = params;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.styledBreadcrumbs}
    >
      <Link
        className={classes.link}
        color="inherit"
        onClick={() => history.push('/')}
      >
        Classes
      </Link>
      <Link>{batchName}</Link>
    </Breadcrumbs>
  );
};

const ChapterScreen = function(props: IProps) {
  const {
    chapters: chapterList,
    students: studentList,
    resetChaptersApi,
    resetStudentsApi,
  } = props;
  const isChaptersLoading = isLoading(chapterList.apiState);
  const isStudentsLoading = isLoading(studentList.apiState);
  const [isChapterTab, setIsChapterTab] = useState(true);
  const failedApiState = isChapterTab
    ? chapterList.apiState
    : studentList.apiState;
  const isApiError: boolean = isApiFailed(failedApiState);
  const handleApiReset = () =>
    isChapterTab ? resetChaptersApi() : resetStudentsApi();

  const errorMessage: string = isChapterTab
    ? 'Failed to fetch chapter data.'
    : 'Failed to fetch student data';
  const classes = useStyles();
  const history = useHistory();
  const params: chapterScreenUrlParamInterface = useParams();
  const { batchId, parentIds, batchName } = params;
  const courses: any[] = getUsersCoursesFromStorage();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const chapterParams = {
      subjectIds: `parentIds=${parentIds}`,
      batchId,
    };
    sagaMiddleware.run(fetchChapters, getChapters, chapterParams);
  }, []);
  let subjects: any = [];
  let subjectNameSet = new Set();

  const studentTabClick = () => {
    const apiState = props.students.apiState;
    if (apiState !== 2) {
      const studentParams = {
        subjectIds: `subjectIds=${parentIds}`,
        batchId: batchId,
      };
      sagaMiddleware.run(fetchStudents, getStudents, studentParams);
    }
  };

  courses.forEach((course: any) => {
    course.subjects.forEach((subject: any) => {
      //@ts-ignore
      if (!subjectNameSet.has(subject.name.toLowerCase())) {
        subjects.push(subject);
        //@ts-ignore
        subjectNameSet.add(subject.name.toLowerCase());
      }
    });
  });
  const chapters: IChapter[] = chapterList.data;
  const students: IStudent[] = studentList.data;
  let finalData = getData(isChapterTab ? chapters : students, searchText);

  return (
    <>
      <HeaderComponent />
      <ChapterScreenBackground>
        <CardHeader>
          <Container>
            {Breadcrumb(params, history, classes)}
            <Grid>
              <ClassCount>
                <BackIcon>
                  <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={() => history.push('/')}
                  />
                </BackIcon>
                {batchName}
              </ClassCount>
              <div>
                <InputContainer>
                  <FormControl>
                    <Input
                      className={classes.searchBatchStyle}
                      id="adornment-search"
                      placeholder={'Search'}
                      type="text"
                      value={searchText || ''}
                      onChange={(el: any) => {
                        setSearchText(el.target.value);
                      }}
                      disableUnderline={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="search icon">
                            <SearchIconEdit />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </InputContainer>
              </div>
            </Grid>
          </Container>
        </CardHeader>

        <Container>
          <TabHeader>
            <ul>
              <li className={isChapterTab ? 'active' : ''}>
                <span
                  onClick={() => {
                    if (!isChapterTab) {
                      setIsChapterTab(true);
                    }
                  }}
                >
                  Chapters {isChapterTab ? `(${finalData.length})` : ''}
                </span>
              </li>
              <li className={!isChapterTab ? 'active' : ''}>
                <span
                  onClick={() => {
                    if (isChapterTab) {
                      studentTabClick();
                      setIsChapterTab(false);
                    }
                  }}
                >
                  Students {!isChapterTab ? `(${finalData.length})` : ''}
                </span>
              </li>
            </ul>
          </TabHeader>
          <CardListing>
            {isChapterTab && (
              <LoaderWrapper isLoading={isChaptersLoading}>
                {finalData.map((data: any, index: any) => (
                  <CommonListCardComponent
                    onCardClick={() => {
                      const chapterIds = data.ids.join(',');
                      const chapterName = data.name;
                      history.push(
                        `/concepts/${batchId}/${parentIds}/${chapterIds}/${batchName}/${chapterName}`,
                      );
                    }}
                    classes={`${titleCase(data.name)}`}
                    proficiency={`Proficiency - ${data.proficiency}`}
                    topic={`Topics ${data.topics.unlocked}/${data.topics.total}`}
                    sNo={index + 1}
                  />
                ))}
              </LoaderWrapper>
            )}
            {!isChapterTab && (
              <LoaderWrapper isLoading={isStudentsLoading}>
                {finalData.map((data: any, index: number) => (
                  <StudentCardComponent
                    name={data.name}
                    proficiency={`Proficiency - ${data.proficiency}`}
                    topic={`Submissions ${data.submissions.count}/${data.submissions.total}`}
                    batchId={data.id}
                    index={index}
                  />
                ))}
              </LoaderWrapper>
            )}
            {!finalData.length && !(isChaptersLoading || isStudentsLoading) && (
              <EmptyState />
            )}
          </CardListing>
          {isApiError ? (
            <SimpleSnackbar
              mode="error"
              state={isApiError}
              onClose={handleApiReset}
              message={errorMessage}
            />
          ) : null}
        </Container>
      </ChapterScreenBackground>
    </>
  );
};

export default ChapterScreen;
