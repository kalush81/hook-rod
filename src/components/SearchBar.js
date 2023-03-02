import React, { useRef, useState } from "react";
import styled from "styled-components";
import "moment/locale/pl";
import plPL from "antd/lib/locale/pl_PL";
import { ConfigProvider } from "antd";
import { SearchForm } from "./SearchForm";

const SearchBar = ({ cityName, rangeProp, datesProp, ulat, ulng }) => {
  return (
    <ConfigProvider locale={plPL}>
      <SearchBarCss>
        <div className="lowi_search_bar">
          <div className="lowi_search">
            <SearchForm className="lowi_search_bar" />
          </div>
        </div>
      </SearchBarCss>
    </ConfigProvider>
  );
};

const SearchBarCss = styled.div`
  .lowi_search_bar {
    width: 100%;
    height: 63px;
    position: fixed;
    display: flex;
    justify-content: center;
    top: 69px;
    left: 0;
    padding: 10.5px;
    border-bottom: 2px solid var(--offwhite);
    background: var(--white);
    z-index: 11;
  }
  .lowi_search {
    width: 100%;
    max-width: 1140px;
    display: flex;
  }
  .lowi_search_input {
    width: 80%;
    margin-right: 9px;
    font-size: 16px;
  }

  .lowi_search_range {
    min-width: 120px;
    margin-right: 9px;
  }
  .lowi_search_date {
    margin-right: 9px;
  }
  .lowi_search_input_ico {
    position: absolute;
    right: 10px;
    top: 16px;
    font-size: 2.4rem;
    color: var(--green);
    font-weight: lighter;
  }

  .lowi_search::placeholder {
    font-weight: lighter;
  }
  .search_button_small {
    display: none;
  }
  @media screen and (max-width: 510px) {
    .search_button {
      display: none;
    }
    .search_button_small {
      display: block;
    }
  }
`;

export default SearchBar;
