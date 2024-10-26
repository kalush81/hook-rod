import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import hookrod_logo from '../../assets/images/hookrod_logo.svg';
import { Squeeze as Hamburger } from 'hamburger-react';
import { Logo, LoginIcon } from '../../assets/icons';
import 'animate.css';
import { useUser } from '../../constext/UserContext';
import { truncate } from '../../utils/truncate';

const Nav = () => {
  const [isToggled, setIsToggled] = useState(false);
  const hide = () => setIsToggled(false);
  const { user, logout } = useUser();

  return (
    <NavCss className='nav'>
      <div className='container'>
        <Link to='/'>
          <div className='nav_logo'>
            <Logo />
          </div>
        </Link>
        <div className='navbar_middle'>
          <ul className='navbar_middle'>
            <li>
              <Link to='/wybierz-województwo'>Łowiska</Link>
            </li>
            <li>
              <Link to='/onas'>O nas</Link>
            </li>
            <li>
              <Link to='/faq'>FAQ</Link>
            </li>
          </ul>
        </div>
        <div className='navbar_right'>
          <ul className='navbar_right'>
            <div className='login'>
              <li style={{ display: 'contents' }}>
                <Link to='/login' replace>
                  {!user ? 'Zaloguj' : 'Wyloguj'}
                </Link>
              </li>
            </div>
            <li>
              <Link to={!user ? '/registration' : '/paneladmin'} replace>
                {!user ? (
                  'Zarejestruj'
                ) : (
                  <>
                    <LoginIcon /> {truncate(user.username, 8)}
                  </>
                )}
              </Link>
            </li>
          </ul>
        </div>
        <div className='hamburger'>
          <Hamburger
            duration={0.6}
            toggled={isToggled}
            toggle={setIsToggled}
            size={27}
            color='#fff'
          />
        </div>
      </div>
      {isToggled && (
        <div className='collapse_navbar'>
          <Link to='/wybierz-województwo'>
            <h1 onClick={hide}>Łowiska</h1>
          </Link>
          <Link to='/onas'>
            <h1 onClick={hide}>O nas</h1>
          </Link>
          <Link to='/faq'>
            <h1 onClick={hide}>FAQ</h1>
          </Link>
          <Link to='/login'>
            <div className='login'>
              <h1 onClick={hide}>Zaloguj</h1>
              <LoginIcon />
            </div>
          </Link>
          <Link to='/registration'>
            <h1 onClick={hide}>Zarejestruj</h1>
          </Link>
        </div>
      )}
    </NavCss>
  );
};

const NavCss = styled.nav`
  display: flex;
  height: 50px;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 111;
  transition: background 0.3s ease-out;
  background: rgba(22, 56, 50, 0.9);
  //border: 2px solid red;

  .container {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    //border: 2px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    display: flex;
    list-style: none;
    overflow: hidden;
  }

  li {
    margin: 0 19px;
  }

  a {
    text-decoration: none;
    color: var(--white);
    font-weight: 500;
    font-size: 16px;
  }
  :hover a {
    text-decoration: none;
  }
  .login li:hover {
    .login_icon {
      filter: invert(69%) sepia(48%) saturate(6955%) hue-rotate(3deg)
        brightness(109%) contrast(101%);
    }
  }
  .navbar_middle {
    margin-right: 22px;
  }
  .nav_logo {
    //background: url(${hookrod_logo});
    position: relative;
    width: 120px;
    background-size: cover;
    background-repeat: no-repeat !important;
    //height: 40px;
    margin-left: 10px;
    color: black;
  }
  .nav_logo:hover {
  }

  .login {
    display: flex;
    align-items: center;
  }
  .login_icon {
    z-index: 100;
    width: 15px;
    height: 15px;
    margin-left: -14px;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(195deg)
      brightness(103%) contrast(102%);
  }
  .hamburger {
    display: none;
  }
  .collapse_navbar {
    display: none;
  }

  @media screen and (max-width: 855px) {
    .navbar_middle li {
      display: none;
    }
    .navbar_right li {
      display: none;
    }
    .login_icon {
      display: none;
    }
    .hamburger {
      display: block;
      margin-right: 10px;
    }
    .collapse_navbar {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin-top: 60px;
      width: 100%;
      height: 60px;
      position: fixed;
      top: 0;
      right: 0;
      background: rgba(22, 56, 50, 0.9);
      color: var(--white);
      border-radius: 0 0 9px 9px;
      z-index: -1;
      border-bottom: 1px solid;
      animation: fadeIn;
      animation-duration: 0.6s;
    }
    .collapse_navbar h1 {
      font-size: 16px;
      color: var(--white);
    }
    .collapse_navbar .login_icon {
      margin-bottom: 5px;
      margin-left: 10px;
      display: block;
    }
  }
  @media screen and (max-width: 580px) {
    .collapse_navbar h1 {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 541px) {
    .collapse_navbar h1 {
      font-size: 16px;
      padding: 10px;
      margin-top: 2px;
    }
    .collapse_navbar .login_icon {
      margin-left: -6px;
      margin-right: 3px;
    }
  }
  @media screen and (max-width: 380px) {
    .collapse_navbar h1 {
      font-size: 14px;
      padding: 10px;
      margin-top: 2px;
    }
  }
`;

export default Nav;
