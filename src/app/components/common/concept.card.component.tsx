import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from 'react-router-dom';
import { handleTestAssign } from '../../helpers/private.api.helper';
import { getUserNameFromStorage } from '../../helpers/local.storage.helper';
import { titleCase } from '../../helpers/comman.helper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { conceptScreenUrlParamInterface } from 'app/types/concept.screen.types';
import SimpleSnackbar from './snackbar.component';

const GreenSwitch = withStyles({
  root: {
    width: 52,
    height: 26,
    padding: 1,
  },
  switchBase: {
    color: '#fff',
    padding: 1,
    '&$checked': {
      color: '#fff',
      transform: 'translateX(27px)',
    },
    '&$checked + $track': {
      backgroundColor: '#1D7DEA',
      opacity: 1,
    },
    '& + $track': {
      opacity: 1,
      backgroundColor: '#ececec',
      borderRadius: '20px',
    },
  },

  thumb: {
    width: 24,
    height: 24,
  },

  checked: {},
  track: {},
})(Switch);

export interface CardProps {
  classes: string;
  conceptData: any;
  index: number;
  handleClick: any;
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
    grid-template-columns: 90% 8% 2%;
    padding: 1em;
    justify-content: space-between;
    align-items: center;
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

const Clickable = styled.div`
  font-size: 22px;
  cursor: pointer;
`;

const ConceptCardComponent = function(props: CardProps) {
  const { classes, conceptData, index, handleClick } = props;
  const { proficiency } = conceptData;
  const params: conceptScreenUrlParamInterface = useParams();
  const { batchId } = params;
  const [isLocked, setIsLocked] = useState(conceptData.isLocked);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnClose = () => {
    setIsError(false);
    setErrorMessage('');
  };

  const handleToggle = async (event: any) => {
    setIsLoading(true);
    if (batchId) {
      const queryParams = {
        batchId,
        type: 'concept',
        typeId: conceptData.ids.join(','),
        teacherName: getUserNameFromStorage(),
        testTypeId: '5dad558756f1b60f71781562',
        newLockValue: !isLocked,
      };
      const response: any = await handleTestAssign(queryParams);
      if (response.data.code === 200) {
        setIsLocked(!isLocked);
      } else {
        setErrorMessage(response.data.message);
        setIsError(true);
      }
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Listing>
        <li>
          <div style={{ cursor: 'pointer' }} onClick={handleClick}>
            <p>
              <ListingIndex>{index + 1}. </ListingIndex>
              {titleCase(classes)}
            </p>
            <Proficiency>Proficiency {proficiency}</Proficiency>
          </div>
          <div>
            {isLoading ? (
              /*
              TODO - tell ui guy to fix and make it global 
              */
              <div
                style={{
                  position: 'fixed',
                  padding: '300px 48%',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(50, 75, 99, .4)',
                  zIndex: 100,
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <FormControlLabel
                control={
                  <GreenSwitch
                    checked={!isLocked}
                    value={!isLocked}
                    onChange={handleToggle}
                  />
                }
                label=""
              />
            )}
          </div>

          <Clickable onClick={handleClick}>></Clickable>
        </li>
      </Listing>
      <SimpleSnackbar
        mode={'error'}
        onClose={handleOnClose}
        message={errorMessage}
        state={isError}
      />
    </div>
  );
};

export default ConceptCardComponent;
