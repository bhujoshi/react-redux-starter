import React from 'react';
import styled from 'styled-components';

const Listing = styled.ul`
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
    transition: all 0.4s ease-in-out;
  }
  &:last-child() {
    border: none;
  }

  li {
    display: grid;
    grid-template-columns: 68% 15% 2% 12% 3%;
    padding: 1.5em;
    justify-content: space-between;
    font-size: 14px;
    div:last-child {
      font-size: 20px;
    }
  }
`;

const CLassNames = styled.div`
  color: #333333;
  font-size: 16px;
`;

export interface CardProps {
  classes: string;
  proficiency: string;
  topic: string;
  sNo?: number;
  onCardClick: (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
}

const CommonListCardComponent = function(props: CardProps) {
  const { classes, proficiency, topic, sNo, onCardClick } = props;
  return (
    <div>
      <Listing onClick={onCardClick}>
        <li>
          <CLassNames>
            {sNo}. {classes}
          </CLassNames>
          <div>{proficiency}</div>
          <div>.</div>
          <div>{topic}</div>
          <div>></div>
        </li>
      </Listing>
    </div>
  );
};

export default CommonListCardComponent;
