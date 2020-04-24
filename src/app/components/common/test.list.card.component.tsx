import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import { getCourseNameById } from 'app/helpers/local.storage.helper';
import { Center, Button } from '..';
import Grid from '@material-ui/core/Grid';
import { Drawer } from '@material-ui/core';
import { testInterface } from 'app/types/test.screen.types';

const Listing = styled.ul`
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f5f5f5;
    transition: all 0.4s ease-in-out;
  }
  &:last-child() {
    border: none;
  }

  li {
    display: grid;
    grid-template-columns: 50% 30% 20%;
    padding: 1em;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
`;

const Proficiency = styled.p`
  font-size: 12px;
  color: #666666;
  text-indent: 25px;
`;

const ListingIndex = styled.span`
  display: inline-block;
  width: 25px;
`;

const LinkEdit = styled(Link)`
  cursor: pointer;
  font-size: 14px;
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

const TestName = styled.p`
  color: #333;
  font-size: 16px;
`;

const SidebarContainer = styled.div`
  max-width: 540px;
  width: 100%;
`;

const SidebarHeader = styled.div`
  box-shadow: 0px 5px 8px rgba(212, 212, 212, 0.5);
  padding: 20px;
`;

const SidebarBody = styled.div`
  padding: 20px;

  h4 {
    font-weight: normal;
    font-size: 24px;
    color: #333333;
    margin-bottom: 10px;
  }

  h5 {
    font-weight: normal;
    font-size: 20px;
    color: #333333;
    margin-bottom: 10px;
  }

  span {
    color: #999999;
    margin-right: 10px;
  }

  b {
    color: #656565;
    font-weight: normal;
  }
`;

const Block = styled.div`
  margin: 30px 10px;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  /* position: absolute;
  bottom: 50px; */
  width: 100%;
  text-align: center;
`;

const SideBarButton = styled(Button)`
  max-width: 300px;
  width: 100%;
`;

const calculateDuration = function(minutes: number) {
  if (minutes < 60) {
    return minutes + ' minutes ';
  } else {
    /*
      checkes if munutes grater then 59
    */
    if (minutes % 60 === 0) {
      const hours = Math.floor(minutes / 60);
      if (hours === 1) {
        return hours + ' hour ';
      } else {
        return hours + ' hours ';
      }
    } else {
      const hours = Math.floor(minutes / 60);
      const minutesToShow = minutes % 60;
      return `${hours} hours ${minutesToShow} minutes`;
    }
  }
};

export interface TestListCardComponentProps {
  sNo: number;
  mode: 'data' | 'list';
  test: testInterface;
}

const TestListCardComponent = function(props: TestListCardComponentProps) {
  const { sNo, mode, test } = props;
  const {
    name,
    courseId,
    duration,
    totalMarks,
    questionsCount,
    syllabus,
    stats,
  } = test;
  const [drowerState, setDrowerState] = useState(false);
  return (
    <div>
      <Listing>
        <li>
          <div>
            <TestName>
              <ListingIndex>{sNo}. </ListingIndex>
              {name}
            </TestName>
            <Proficiency>
              {getCourseNameById(courseId) + ', ' + calculateDuration(duration)}
            </Proficiency>
          </div>

          <div>
            {mode === 'list' ? (
              ''
            ) : stats && stats.attempted ? (
              <p>
                <span>Avg . Score {stats.proficiency} . Submissions </span>
                <span>{`${stats.submissions.count}/${stats.submissions.total}`}</span>
              </p>
            ) : (
              <p>No attempt yet</p>
            )}
          </div>
          <Center>
            <LinkEdit
              onClick={() => {
                setDrowerState(true);
              }}
            >
              {' '}
              View details{' '}
            </LinkEdit>
          </Center>
        </li>
      </Listing>
      <Drawer
        anchor={'right'}
        open={drowerState}
        onClose={() => {
          setDrowerState(false);
        }}
      >
        <SidebarContainer>
          <SidebarHeader>
            <Grid container spacing={3}>
              <Grid
                item
                sm={1}
                onClick={() => {
                  setDrowerState(false);
                }}
              >
                <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/right-arrow.svg" />
              </Grid>

              <Grid item sm={11}>
                <Center>Detail Page</Center>
              </Grid>
            </Grid>
          </SidebarHeader>

          <SidebarBody>
            <Block>
              <h4>
                {sNo}. {name}{' '}
              </h4>
              <span>
                {getCourseNameById(courseId) +
                  ', ' +
                  calculateDuration(duration)}
              </span>
            </Block>

            <Block>
              <h5>Syllabus</h5>
              <p>{syllabus}</p>
            </Block>

            <Block>
              <h5>Test Format</h5>

              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <p>
                    <span>Goal:</span>
                    <b>{getCourseNameById(courseId)}</b>{' '}
                  </p>
                </Grid>

                <Grid item sm={6}>
                  <p>
                    <span>Duration:</span>
                    <b>{calculateDuration(duration)}</b>{' '}
                  </p>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <p>
                    <span>Total Marks:</span>
                    <b>{totalMarks}</b>{' '}
                  </p>
                </Grid>

                <Grid item sm={6}>
                  <p>
                    <span>No. of Questions:</span>
                    <b>{questionsCount}</b>{' '}
                  </p>
                </Grid>
              </Grid>
            </Block>
          </SidebarBody>
          <SidebarFooter>
            <ButtonEdit>View {questionsCount} Questoins</ButtonEdit>
          </SidebarFooter>
        </SidebarContainer>
      </Drawer>
    </div>
  );
};

export default TestListCardComponent;
