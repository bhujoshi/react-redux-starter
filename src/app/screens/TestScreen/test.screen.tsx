import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/common/header.component';

import { Container, InputContainer, Button, Right } from '../../components';

import styled from 'styled-components';
import { getTests, handleTestAssign } from '../../helpers/private.api.helper';
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
import { filterData, IListObj } from '../../helpers/comman.helper';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchTests } from './test.sagas';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import TestListCardComponent from 'app/components/common/test.list.card.component';
import LockIcon from '@material-ui/icons/Lock';
import { getUserNameFromStorage } from 'app/helpers/local.storage.helper';
import { CircularProgress } from '@material-ui/core';
import { API_STATE } from 'app/stores/api.reducer';
import EmptyStateWrapper from 'app/components/common/empty.state.wrapper.component';
import ToolTipWrapper from 'app/components/common/tool.tip.wrapper.component copy';
import { testsDataInterface, testInterface } from 'app/types/test.screen.types';

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
  min-height: 200px;
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

const FixedFooterContainer = styled.div`
  margin-bottom: 4em;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.15);
  padding: 1em;
`;

const ButtonEdit = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

const Breadcrumb = (
  // TODO add interface later
  params: any,
  history: any,
  classes: any,
) => {
  const { batchId, batchName, chapterName, parentIds } = params;

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
        <ToolTipWrapper content={batchName} />
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(`/chapters/${batchId}/${parentIds}/${batchName}`)
        }
      >
        Chapters
      </Link>
      <Link className={classes.link} onClick={() => history.goBack()}>
        <ToolTipWrapper content={chapterName} />
      </Link>
      <Link className={classes.lastBread}>Tests</Link>
    </Breadcrumbs>
  );
};

interface IProps {
  tests: testsDataInterface;
}

const TestScreen = function(props: IProps) {
  const history = useHistory();
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    batchId,
    conceptIds,
    isConceptLocked,
    conceptName,
    chapterName,
    batchName,
    parentIds,
  } = useParams();

  useEffect(() => {
    sagaMiddleware.run(fetchTests, getTests, {
      batchId,
      conceptIds,
      mode: isConceptLocked == 'true' ? 'list' : 'data',
    });
  }, []);
  const { tests } = props;

  const filterTests = filterData({
    data: tests.data,
    filter: { key: 'name', value: searchText },
  });
  const handleLock = async function() {
    setIsLoading(true);
    if (batchId && conceptIds) {
      const queryParams = {
        batchId,
        type: 'concept',
        typeId: conceptIds,
        teacherName: getUserNameFromStorage(),
        testTypeId: '5dad558756f1b60f71781562',
        newLockValue: isConceptLocked == 'true' ? false : true,
      };
      const response: any = await handleTestAssign(queryParams);
      if (response.data.code === 200) {
        sagaMiddleware.run(fetchTests, getTests, {
          batchId,
          conceptIds,
          mode: queryParams.newLockValue ? 'list' : 'data',
        });
        history.replace(
          `/tests/${batchId}/${conceptIds}/${conceptName}/${queryParams.newLockValue}/
          ${batchName}/${parentIds}/${chapterName}`,
        );
      } else {
        //setErrorMessage(response.data.message);
      }
      setIsLoading(false);
    }
  };
  return (
    <>
      <HeaderComponent />
      <ConceptScreenBackground>
        <CardHeader>
          <Container>
            {Breadcrumb(
              { batchId, conceptIds, chapterName, batchName, parentIds },
              history,
              classes,
            )}
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
                <span>Test ({filterTests.length}) </span>
                <span>
                  ( Topic -{' '}
                  {conceptName ? <ToolTipWrapper content={conceptName} /> : ''}{' '}
                  )
                </span>
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
        <FixedFooterContainer>
          <Container>
            <CardListing>
              <LoaderWrapper isLoading={tests.apiState === API_STATE.LOADING}>
                <EmptyStateWrapper
                  isEmpty={filterTests.length === 0}
                  fallback={<EmptyState />}
                >
                  {filterTests.map((test: testInterface, index: any) => {
                    return (
                      <TestListCardComponent
                        sNo={index + 1}
                        key={test.name + index}
                        mode={isConceptLocked == 'true' ? 'list' : 'data'}
                        test={test}
                      />
                    );
                  })}
                </EmptyStateWrapper>
              </LoaderWrapper>
            </CardListing>
            <SimpleSnackbar
              mode="error"
              state={
                tests.apiState === API_STATE.FAILED ||
                tests.apiState === API_STATE.ERROR
              }
              onClose={() => {}}
              message={tests.error}
            />
          </Container>
        </FixedFooterContainer>
        <Footer>
          <Container>
            <Right>
              <LoaderWrapper
                isLoading={isLoading}
                fallback={<CircularProgress />}
              >
                <ButtonEdit onClick={handleLock}>
                  <LockIcon />
                  &nbsp;{isConceptLocked == 'true' ? 'Unlock' : 'Lock'} Topic
                </ButtonEdit>
              </LoaderWrapper>
            </Right>
          </Container>
        </Footer>
      </ConceptScreenBackground>
    </>
  );
};

export default TestScreen;
