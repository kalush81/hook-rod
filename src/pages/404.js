import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "gatsby";

export default function FourOhFour(props) {
  console.log(props);
  return (
    <Div>
      <h2>
        na te chwile w naszej bazie danych nie ma łowisk w tym województwie
      </h2>
      <Link to={"/wybierz-województwo"}>
        <Button
          className="search_button_small"
          type="primary"
          icon={<SearchOutlined />}
          size="large"
        >
          Wroc do wyszukiwarki
        </Button>
      </Link>
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
