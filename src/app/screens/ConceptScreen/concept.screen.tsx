import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/common/header.component';
import ConceptCardComponent from '../../components/common/concept.card.component';
import { Container, InputContainer } from '../../components';
import styled from 'styled-components';
import { getConcept } from '../../helpers/private.api.helper';
import { getUsersCoursesFromStorage } from '../../helpers/local.storage.helper';
import { useHistory, useParams } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import { EmptyState } from '../../components/common/emptyState.component';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  filterData,
  sortProficiencyFunction,
  IListObj,
  isLoading,
  isApiFailed,
} from '../../helpers/comman.helper';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchConcepts } from './concept.sagas';
import { conceptScreenUrlParamInterface } from 'app/types/concept.screen.types';
import SimpleSnackbar from 'app/components/common/snackbar.component';

interface IProps {
  concepts: IListObj;
  resetConceptsApi: any;
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

const ConceptScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
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

const CardListing = styled.div`
  background-color: #fff;
  margin-top: -3em;
  color: var(--text-color);
  border-radius: 4px;
`;

const ClassCount = styled.div`
  font-size: 1.5em;
  /* margin-top: 1em; */

  span:nth-of-type(2) {
    font-size: 1em;
  }

  span:nth-of-type(3) {
    font-size: 0.7em;
  }
`;

const BackIcon = styled.span`
  cursor: pointer;
  width: 26px;
  height: 21px;
  margin: 0 1em 0 0;
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
  params: conceptScreenUrlParamInterface,
  history: any,
  classes: any,
) => {
  const { batchId, batchName, parentIds } = params;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.styledBreadcrumbs}
    >
      <Link className={classes.link} onClick={() => history.push('/')}>
        Classes
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(`/chapters/${batchId}/${parentIds}/${batchName}`)
        }
      >
        {batchName}
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(`/chapters/${batchId}/${parentIds}/${batchName}`)
        }
      >
        Chapters
      </Link>
      <Link className={classes.lastBread}>Topics</Link>
    </Breadcrumbs>
  );
};

const getChapterName = (name: string = '') =>
  name.length > 30 ? `${name.slice(0, 30)}...` : name;

const ConceptScreen = function(props: IProps) {
  const { concepts: conceptList, resetConceptsApi } = props;
  const isConceptsLoading: boolean = isLoading(conceptList.apiState);
  const isApiError: boolean = isApiFailed(conceptList.apiState);
  const classes = useStyles();
  const history = useHistory();
  const params: conceptScreenUrlParamInterface = useParams();
  const { batchId, chapterIds, chapterName, batchName, parentIds } = params;
  const courses: any[] = getUsersCoursesFromStorage();
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const conceptParams = {
      chapterIds: `parentIds=${chapterIds}`,
      batchId: batchId,
    };
    sagaMiddleware.run(fetchConcepts, getConcept, conceptParams);
  }, []);
  const handleApiReset = () => resetConceptsApi();
  let subjects: any = [];
  let subjectNameSet = new Set();
  courses.forEach((course: any) => {
    course.subjects.forEach((subject: any) => {
      if (!subjectNameSet.has(subject.name.toLowerCase())) {
        subjects.push(subject);
        subjectNameSet.add(subject.name.toLowerCase());
      }
    });
  });
  const concepts = conceptList.data;
  let finalData = getData(concepts, searchText);
  return (
    <>
      <HeaderComponent />
      <ConceptScreenBackground>
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
                    onClick={() => history.goBack()}
                  />
                </BackIcon>
                <span>Topics ({finalData.length}) </span>
                <span>( Chapter - {getChapterName(chapterName)} )</span>
              </ClassCount>

              <div>
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
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </InputContainer>
                </div>
              </div>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <CardListing>
            <LoaderWrapper isLoading={isConceptsLoading}>
              {finalData.length > 0 ? (
                finalData.map((data: any, index: any) => (
                  <ConceptCardComponent
                    classes={data.name}
                    conceptData={data}
                    index={index}
                    handleClick={() => {
                      history.push(
                        `/tests/${batchId}/${data.ids.join(',')}/${data.name}/${
                          data.isLocked
                        }/
                        ${batchName}/${parentIds}/${chapterName}`,
                      );
                    }}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </LoaderWrapper>
          </CardListing>
          {isApiError ? (
            <SimpleSnackbar
              mode="error"
              state={isApiError}
              onClose={handleApiReset}
              message={'Failed to fetch concept data.'}
            />
          ) : null}
        </Container>
      </ConceptScreenBackground>
    </>
  );
};

export default ConceptScreen;
