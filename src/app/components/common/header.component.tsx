import React from 'react';
import {
  logout,
  getUserNameFromStorage,
} from '../../helpers/local.storage.helper';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Dropdown } from '..';
import { UserAvatar } from '../atoms/user-avatar';

const Header = styled.div`
  background-color: #fff;
`;

const Logo = styled.img`
  margin-right: 4em;
  transform: scale(0.9);
`;

const NavigationRight = styled.ul`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Navigation = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: center;
  align-items: center;

  > ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    li {
      &:not(:first-child) {
        margin-right: 3em;
        line-height: 70px;
        height: 70px;
        border-bottom: 2px solid var(--brand-color);
      }

      a {
        text-decoration: none;
        color: var(--text-color);
      }
    }
  }
`;

const HeaderComponent = () => {
  const history = useHistory();
  const logoutUser = function() {
    logout();
    history.push('/login');
  };
  const profileName = getUserNameFromStorage();
  return (
    <div>
      <Header>
        <Container>
          <Navigation>
            <ul>
              <li>
                <a href="/">
                  <Logo
                    src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/mypat-teachers-logo.svg"
                    alt=""
                  />
                </a>
              </li>
              <li>
                <a href="/">Classes</a>
              </li>
            </ul>
            <div>
              <NavigationRight>
                <li>
                  <Dropdown></Dropdown>
                </li>
                <li>
                  <Dropdown>
                    <UserAvatar>
                      <h4>
                        <span>{profileName && profileName[0]}</span>{' '}
                        {profileName} &nbsp;{' '}
                        <img
                          width="15"
                          src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-down.svg"
                          alt=""
                        />
                      </h4>
                    </UserAvatar>

                    <ul>
                      <li>
                        <a href="#" onClick={logoutUser}>
                          logout{' '}
                        </a>
                      </li>
                    </ul>
                  </Dropdown>
                </li>
              </NavigationRight>
            </div>
          </Navigation>
        </Container>
      </Header>
    </div>
  );
};

export default HeaderComponent;
