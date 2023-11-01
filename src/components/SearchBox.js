import React, { useRef } from 'react';
import styled from 'styled-components';
import { ConfigProvider } from 'antd';
import { SearchForm } from './SearchForm';
import plPL from 'antd/lib/locale/pl_PL';

const SearchBox = () => {
  const header = useRef(null);

  return (
    <ConfigProvider locale={plPL}>
      <SearchBoxCss>
        <div className='home_search_box'>
          <h1 ref={header} className='home_cover_header--big'>
            HOOK&ROD
          </h1>
          <h2 className='home_cover_header'>Znajdź łowiska blisko Ciebie</h2>
          <div className='home_cover_search'>
            <SearchForm className={'home_cover_search_input'} />
          </div>
        </div>
      </SearchBoxCss>
    </ConfigProvider>
  );
};

const SearchBoxCss = styled.div`
  .home_search_box {
    padding: 21px 21px;
    box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.3);
    border-radius: 19px;
    width: 100%;
    max-width: 920px;
    background: rgba(22, 56, 50, 0.9);
  }
  .home_cover_header {
    width: 100%;
    /* max-width: 800px; */
    font-family: 'Lato';
    font-size: 19px;
    font-weight: 500;
    text-align: center;
    color: var(--white);
    margin-bottom: 30px;
  }

  .home_cover_header--big {
    font-family: 'Lato';
    font-size: 58px;
    font-weight: 700;
    text-align: center;
    color: var(--white);
    font-weight: bolder;
    margin-bottom: -20px;
  }

  .home_cover_search {
    width: 100%;
    /* max-width: 800px; */
    position: relative;
    display: flex;
    margin-bottom: 5px;
    align-items: baseline;
  }
  .home_cover_search_input {
    width: 200px;
    margin-right: 9px;
    font-size: 16px;
    border-radius: 40px;
  }

  .home_cover_search_range {
    margin-right: 9px;
    width: 135px;
  }
  .home_cover_search_date {
    margin-right: 9px;
    width: 200px;
    background: white;
    &:hover {
      background: white;
    }
  }
  .home_cover_search_input_ico {
    position: absolute;
    right: 10px;
    top: 16px;
    font-size: 2.4rem;
    color: var(--green);
    font-weight: lighter;
  }

  .home_cover_search::placeholder {
    font-weight: lighter;
  }

  .home_cover_search_btn {
    background-color: var(--yellow);
    border-radius: 100px;
  }
  .ant-picker-range .ant-picker-clear {
    opacity: 1 !important;
  }

  .ant-picker-range .ant-picker-clear svg {
    transform: scale(1.39) !important;
  }

  @media screen and (max-width: 855px) {
    .home_search_box {
      height: 100%;
      width: 500px;
      padding: 27px 27px;
    }
    .home_cover_header {
      margin-bottom: 20px;
    }
    .home_cover_search {
      flex-direction: column;
      align-items: center;
    }
    .home_cover_search_input {
      width: 320px;
      font-size: 16px;
      margin-top: 5px;
    }
    .home_cover_search_range {
      width: 320px;
      margin-top: 5px;
    }
    .home_cover_search_date {
      width: 320px;
      margin-top: 5px;
    }
    .home_cover_search_btn {
      margin-top: 20px;
    }
  }
  @media screen and (max-width: 510px) {
    .home_search_box {
      width: 100%;
    }
    .home_cover_search {
      align-items: center;
    }
    .home_cover_search_input {
      width: 300px;
    }
    .home_cover_search_range {
      width: 300px;
    }
    .home_cover_search_date {
      width: 300px;
    }
  }
  @media screen and (max-width: 400px) {
    .home_cover_header--big {
      font-size: 50px;
    }
    .home_search_box {
      padding: 20px 20px;
    }
  }
`;

export default SearchBox;
