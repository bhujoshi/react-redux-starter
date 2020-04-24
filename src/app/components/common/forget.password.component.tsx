import React, { useState } from 'react';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { InputContainer, Button, Center } from '../atoms';
import {
  forgetPasswordRequest,
  getOrganizationCentres,
} from '../../helpers/public.api.helper';
import { IOption } from '../../screens/LoginScreen/login.screen';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fetchOrgCenters } from '../../screens/LoginScreen/login.sagas';
import { sagaMiddleware } from '../../stores/configure.store';

export interface ModalProps {
  onClose?: () => void;
  orgOptions: any[];
  orgCentreOptions: any[];
  selectedOrg: any;
  selectedCenter: any;
  employId: any;
  setOrg: any;
  setOrgCenter: any;
  setEmployId: any;
}

const useStyles = makeStyles({
  title: {
    fontSize: '24px',
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily: 'rubik',
    color: '#666666',
  },
});

const ForgetPasswordContainer = styled.div`
  padding: 2em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ButtonEdit = styled(Button)`
  margin-top: 20px;
`;

const ForgetPasswordComponent = function(props: ModalProps) {
  const { onClose } = props;
  const classes = useStyles();
  const {
    selectedOrg,
    selectedCenter,
    employId,
    setOrg,
    setOrgCenter,
    setEmployId,
    orgOptions,
    orgCentreOptions,
  } = props;

  const [forgetPasswordSubmitState, setForgetPasswordSubmitState] = useState(
    false,
  );

  const loadOrgCentres = async (orgId: string) => {
    if (orgId === '') {
      return '';
    }
    sagaMiddleware.run(fetchOrgCenters, getOrganizationCentres, orgId);
  };

  const forgetPassword = async (e: any) => {
    e.preventDefault();
    const res = await forgetPasswordRequest({
      empCode: employId,
      orgName: selectedOrg.label,
      centreName: selectedCenter.label,
    });
    if (res.data.code === 200) {
      setForgetPasswordSubmitState(true);
    }
  };

  const isOptionDisabled = () => {
    return (
      !!employId.length &&
      !!selectedOrg.label.length &&
      !!selectedCenter.label.length
    );
  };

  return (
    <div>
      <h2 className={classes.title}>Forget Password</h2>
      {!forgetPasswordSubmitState ? (
        <>
          <InputContainer>
            <FormControl fullWidth={true}>
              <Autocomplete
                value={selectedOrg}
                onChange={(e: any, option: any) => {
                  setOrg(option);
                  loadOrgCentres(option.value);
                }}
                getOptionLabel={(option: IOption) => option.label}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select School"
                    variant="outlined"
                  />
                )}
                options={orgOptions}
                disableClearable={true}
              />
            </FormControl>
          </InputContainer>

          <InputContainer>
            <FormControl fullWidth={true}>
              <Autocomplete
                value={selectedCenter}
                onChange={(e: any, option: any) => {
                  setOrgCenter(option);
                }}
                getOptionLabel={(option: IOption) => option.label}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Center"
                    variant="outlined"
                  />
                )}
                options={orgCentreOptions}
                disableClearable={true}
              />
            </FormControl>
          </InputContainer>

          <InputContainer>
            <FormControl fullWidth={true}>
              <TextField
                label="Employee ID"
                type={'text'}
                value={employId}
                onChange={e => {
                  setEmployId(e.target.value);
                }}
                variant="outlined"
                fullWidth={true}
              />
            </FormControl>
          </InputContainer>
        </>
      ) : (
        <ForgetPasswordContainer>
          <p>
            Link to reset your password has been sent to your <br />
            registered email id. Please login to your email and follow <br />
            the steps to reset your password.
          </p>
        </ForgetPasswordContainer>
      )}
      {!forgetPasswordSubmitState ? (
        <Center>
          <ButtonEdit
            onClick={(event: any) => forgetPassword(event)}
            disabled={!isOptionDisabled()}
          >
            Reset Password
          </ButtonEdit>
        </Center>
      ) : (
        <Center>
          <Button onClick={onClose}>Okay, Got it</Button>
        </Center>
      )}
    </div>
  );
};

export default ForgetPasswordComponent;
