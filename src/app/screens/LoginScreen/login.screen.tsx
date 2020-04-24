import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Form, InputContainer } from 'app/components/atoms/form-inputs';
import { Button } from 'app/components/atoms/button';
import { ErrorMsg } from 'app/components/atoms/error-messages';
import {
  getOrganizations,
  getOrganizationCentres,
  loginUser,
} from 'app/helpers/public.api.helper';
import { Organization, OrganizationCentre } from 'app/types/login.screen.types';
import { useHistory } from 'react-router-dom';
import Slider from 'app/components/atoms/slider/slider.component';
import {
  LOGIN_TOKEN_KEY,
  setUserNameInStorage,
  setUsersCoursesInStorage,
} from 'app/helpers/local.storage.helper';
import ModalComponent from 'app/components/common/modal.component';
import ForgetPasswordComponent from 'app/components/common/forget.password.component';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import { sagaMiddleware } from 'app/stores/configure.store';
import { fetchOrg, fetchOrgCenters } from './login.sagas';
import { isApiFailed } from 'app/helpers/comman.helper';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import { Right } from 'app/components';

export interface IOption {
  label: string;
  value: string;
}

const LoginContainer = styled.div`
  background-color: #f4f8f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled.div`
  background-color: #fff;
  padding: 20px 0 10px 40px;
  box-shadow: 0px 2px 8px rgba(174, 174, 174, 0.25);
  max-width: 1170px;
  width: 100%;
  margin: 10px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
  @media (max-width: 768px) {
    display: block;
  }
`;
const FormEdit = styled(Form)`
  max-width: 450px;
  margin: 0 20px auto;
  & h1 {
    font-size: 36px;
    color: #333333;
    font-weight: normal;
  }

  & p {
    font-size: 16px;
    color: #333333;
    margin-top: 10px;
  }
`;

const InputContainerEdit = styled(InputContainer)`
  a {
    text-decoration: none;
    font-size: 14px;
    text-align: right;
    display: inline;
    width: fit-content;
    margin-left: auto;
  }
`;

const ShowPassword = styled.img`
  cursor: pointer;
`;

const ErrorMsgEdit = styled(ErrorMsg)`
  font-size: 12px;
`;

const ForgotPassword = styled.div`
  text-align: right;
  margin: 11px 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 14px;
    text-decoration: none;
  }
`;

const PASSWORD_IMAGES = (state: boolean) => {
  if (state) {
    return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/eye-closed-icon.png';
  } else {
    return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/open-eye.png';
  }
};

const sliderProps = {
  images: [
    'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/slide-1.png',
    'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/slide-2.png',
    'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/slide-3.png',
  ],
  captions: [
    'Assign Test in a Single Click',
    'Analyze Students and Batch Perfromance',
    'Get Performance Analysis Reports Every Week',
  ],
};

const getSnackbarMessage = (
  isLoggedIn: boolean,
  isOrgApiFailed: boolean,
  isOrgCenterApiFailed: boolean,
) => {
  if (isLoggedIn) {
    return 'You have been successfully Logged out.';
  } else if (isOrgApiFailed) {
    return 'Failed to fetch organization list.';
  } else if (isOrgCenterApiFailed) {
    return 'Failed to fetch org Centers list.';
  } else {
    return '';
  }
};

const getSnackBarMode = (isLoggedIn: boolean) => {
  if (isLoggedIn) {
    return 'success';
  } else {
    return 'error';
  }
};

const LoginScreen = function(props: any) {
  const {
    selectedOrg,
    selectedCenter,
    employId,
    password,
    selectedOrgForgetPassword,
    selectedCenterForgetPassword,
    employIdForgetPassword,
    organizations,
    organizationCentres,
    isLoggedIn,
  } = props;
  const {
    setOrg,
    setOrgCenter,
    setEmployId,
    setPassword,
    setOrgForgetPassword,
    setOrgCenterForgetPassword,
    setEmployIdForgetPassword,
    resetOrgApi,
    resetOrgCenterApi,
    resetState,
    setIsLoggedIn,
  } = props;
  const [isPassword, setIsPassword] = useState(true);
  const [signInError, setSignInError] = useState(null);
  const [modalState, setModalState] = useState(false);
  const isSnackbarActive: boolean =
    isApiFailed(organizations.apiState) ||
    isApiFailed(organizationCentres.apiState) ||
    isLoggedIn;

  const snackBarMessage = getSnackbarMessage(
    isLoggedIn,
    isApiFailed(organizations.apiState),
    isApiFailed(organizationCentres.apiState),
  );

  const snackBarMode = getSnackBarMode(isLoggedIn);

  const history = useHistory();
  useEffect(() => {
    sagaMiddleware.run(fetchOrg, getOrganizations, null);
  }, []);

  const handleSnackbarClose = () => {
    if (isApiFailed(organizations.apiState)) {
      resetOrgApi();
    } else if (isApiFailed(organizationCentres.apiState)) {
      resetOrgCenterApi();
    } else {
      setIsLoggedIn(false);
    }
  };

  const loadOrgCentres = async (orgId: string) => {
    if (orgId === '') {
      return '';
    }
    sagaMiddleware.run(fetchOrgCenters, getOrganizationCentres, orgId);
  };

  const login = async (e: any) => {
    e.preventDefault();
    const res = await loginUser({
      empCode: employId,
      password: password,
      orgId: selectedOrg.value,
    });
    if (res.data.code === 200) {
      localStorage.setItem(LOGIN_TOKEN_KEY, res.data.data.auth_token);
      setUserNameInStorage(res.data.data.name);
      const { courses } = res.data.data;
      if (courses) {
        setUsersCoursesInStorage(JSON.stringify(courses));
      }
      resetState();
      history.push('/');
      setIsLoggedIn(true);
    } else {
      setSignInError(res.data.message);
    }
  };

  const validation = function() {
    if (
      selectedOrg &&
      selectedOrg.value.length > 0 &&
      selectedCenter &&
      selectedCenter.value.length > 0 &&
      employId.length > 0 &&
      password.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const orgOptions = organizations.data.map((org: Organization) => ({
    value: org.id,
    label: org.name,
  }));

  const orgCentreOptions = organizationCentres.data.map(
    (org: OrganizationCentre) => ({ value: org.id, label: org.name }),
  );

  const showPassword = () => {
    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {
              setIsPassword(!isPassword);
            }}
          >
            <ShowPassword src={PASSWORD_IMAGES(isPassword)} alt="" />
          </IconButton>
        </InputAdornment>
      ),
    };
  };

  return (
    <div>
      <LoginContainer>
        <LoginCard>
          <ModalComponent
            isOpen={modalState}
            onClose={() => setModalState(!modalState)}
          >
            <ForgetPasswordComponent
              onClose={() => setModalState(!modalState)}
              orgOptions={orgOptions}
              orgCentreOptions={orgCentreOptions}
              selectedOrg={selectedOrgForgetPassword}
              selectedCenter={selectedCenterForgetPassword}
              employId={employIdForgetPassword}
              setOrg={setOrgForgetPassword}
              setOrgCenter={setOrgCenterForgetPassword}
              setEmployId={setEmployIdForgetPassword}
            />
          </ModalComponent>

          <img
            src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/mypat-teachers-logo.svg"
            alt=""
          />
          <GridContainer>
            <div>
              <Slider height={400} width={535} sliderProps={sliderProps} />
            </div>
            <div>
              <FormEdit>
                <h1>Welcome</h1>
                <p>Sign in to continue</p>

                <InputContainerEdit>
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
                </InputContainerEdit>

                <InputContainerEdit>
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
                </InputContainerEdit>

                <InputContainerEdit>
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
                </InputContainerEdit>

                <InputContainerEdit>
                  <FormControl fullWidth={true}>
                    <TextField
                      label="Password"
                      type={isPassword ? 'password' : 'text'}
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                      variant="outlined"
                      fullWidth={true}
                      InputProps={showPassword()}
                    />
                  </FormControl>
                </InputContainerEdit>

                <ForgotPassword>
                  <span>
                    {signInError && <ErrorMsgEdit>{signInError}</ErrorMsgEdit>}
                  </span>

                  <a href="#" onClick={() => setModalState(true)}>
                    Forgot Password ?{' '}
                  </a>
                </ForgotPassword>

                <Right>
                  <Button onClick={login} disabled={validation()}>
                    Login
                  </Button>
                </Right>
              </FormEdit>
            </div>
          </GridContainer>
        </LoginCard>
        {isSnackbarActive ? (
          <SimpleSnackbar
            mode={snackBarMode}
            state={isSnackbarActive}
            message={snackBarMessage}
            onClose={handleSnackbarClose}
          />
        ) : null}
      </LoginContainer>
    </div>
  );
};

export default LoginScreen;
