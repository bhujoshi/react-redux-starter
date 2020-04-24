import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/common/header.component';
import CommonListCardComponent from '../../components/common/common.list.card.component';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import { Container, InputContainer } from '../../components';
import { getClasses } from '../../helpers/private.api.helper';
import { getUsersCoursesFromStorage } from '../../helpers/local.storage.helper';
import { EmptyState } from '../../components/common/emptyState.component';
import {
  filterData,
  sortProficiencyFunction,
  IBatch,
  IListObj,
  isLoading,
  isApiFailed,
} from '../../helpers/comman.helper';
import { useHistory } from 'react-router-dom';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchClasses } from './dashboard.sagas';
import SimpleSnackbar from 'app/components/common/snackbar.component';

interface IProps {
  classes: IListObj;
  resetClassesApi: any;
}

const useStyles = makeStyles({
  searchBatchStyle: {
    padding: '5px 0px 5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
  },
});

const SearchIconEdit = styled(SearchIcon)`
  fill: #1d7dea !important;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: center;
  align-items: center;
  > div {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const DashboradBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
`;

const CardHeader = styled.div`
  min-height: 135px;
  background-color: var(--brand-color);
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
`;
const InputContainerEdit = styled(InputContainer)`
  select {
    -webkit-appearance: initial;
    background-image: url('https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-down-bold.svg');
    background-repeat: no-repeat;
    background-position: 125px 14px;
    max-width: 150px;
    width: 100%;
  }
  input {
    &::-webkit-input-placeholder {
      opacity: 1;
    }
  }
`;

function getListingData(
  batches: any[],
  selectedSubject: string,
  searchText: string,
) {
  let finalBatchData: any[] = [];
  batches.forEach((batch: any) => {
    const batchCopy: any = { ...batch };
    batchCopy._subjects = batch.subjects.filter((subject: any) => {
      return subject.name.toLowerCase() === selectedSubject.toLowerCase();
    });
    const subjectIds: string[] = [];
    batchCopy._subjects.forEach((subject: { ids: string[] }) =>
      subject.ids.forEach((id: string) => subjectIds.push(id)),
    );
    if (batchCopy._subjects.length > 0) {
      finalBatchData.push({
        id: batchCopy.id,
        batch: batchCopy.name.toUpperCase(),
        subjectIds: subjectIds,
        proficiency: batchCopy._subjects[0].proficiency,
        topics:
          batchCopy._subjects[0].topics.unlocked +
          '/' +
          batchCopy._subjects[0].topics.total,
      });
    }
  });
  finalBatchData = filterData({
    data: finalBatchData,
    filter: { key: 'batch', value: searchText },
  });
  finalBatchData = sortProficiencyFunction(finalBatchData);
  return finalBatchData;
}

const DashboradScreen = function(props: IProps) {
  const { classes: classList, resetClassesApi } = props;
  const isClassesLoading: boolean = isLoading(classList.apiState);
  const isApiError: boolean = isApiFailed(classList.apiState);
  const history = useHistory();
  const classes = useStyles();
  const courses: any[] = getUsersCoursesFromStorage();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    sagaMiddleware.run(fetchClasses, getClasses, null);
  }, []);
  const handleApiReset = () => resetClassesApi();
  let subjects: any = [];
  let subjectNameSet = new Set();
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

  const batches: IBatch[] = classList.data;
  let finalBatchData = getListingData(batches, selectedSubject, searchText);

  return (
    <>
      <HeaderComponent />
      <DashboradBackground>
        <CardHeader>
          <Container>
            <Grid>
              <ClassCount>Classes ({finalBatchData.length}) </ClassCount>
              <div>
                <InputContainerEdit>
                  <select
                    value={selectedSubject}
                    onChange={(e: any) => {
                      setSelectedSubject(e.target.value);
                    }}
                  >
                    <option value="all">All Subjects</option>
                    {subjects.map((subject: any) => (
                      <option value={subject.name.toLowerCase()}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </InputContainerEdit>

                <InputContainerEdit>
                  <div>
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
                  </div>
                </InputContainerEdit>
              </div>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <CardListing>
            <LoaderWrapper isLoading={isClassesLoading}>
              {finalBatchData.length ? (
                finalBatchData.map((batchData: any, index: number) => (
                  <CommonListCardComponent
                    onCardClick={() => {
                      const batchId = batchData.id;
                      const parentIds = batchData.subjectIds
                        .map((id: any) => id)
                        .join(',');
                      const batchName = batchData.batch;
                      history.push(
                        `/chapters/${batchId}/${parentIds}/${batchName}`,
                        { batchData },
                      );
                    }}
                    classes={batchData.batch}
                    proficiency={`Proficiency - ${batchData.proficiency}`}
                    topic={`Topics ${batchData.topics}`}
                    sNo={index + 1}
                    key={batchData.id}
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
              message={'Failed to fetch class data.'}
            />
          ) : null}
        </Container>
      </DashboradBackground>
    </>
  );
};

export default DashboradScreen;
