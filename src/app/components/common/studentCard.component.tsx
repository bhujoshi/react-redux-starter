import React from 'react';
import styled from 'styled-components';
import { UserAvatar, Left } from '../atoms';
import { titleCase, getColorCode } from '../../helpers/comman.helper';

export interface CardProps {
  name: string;
  proficiency: string;
  topic: string;
  batchId: string;
  index: number;
}

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
    grid-template-columns: 58% 20% 5% 15% 2%;
    padding: 1.5em;
    justify-content: space-between;
  }
`;

const StudentCardComponent = function(props: CardProps) {
  const { name, proficiency, topic } = props;

  return (
    <div>
      <Listing>
        <li>
          <div>
            <span>
              <UserAvatar>
                <span
                  style={{
                    backgroundColor: `${getColorCode(name[0].toLowerCase())}`,
                    color: '#fff',
                  }}
                >
                  {name && name[0]}
                </span>
              </UserAvatar>
            </span>
            <span>{titleCase(name)}</span>
          </div>
          <div>
            <Left>{proficiency}</Left>
          </div>
          <div>.</div>
          <div>{topic}</div>
        </li>
      </Listing>
    </div>
  );
};

export default StudentCardComponent;
