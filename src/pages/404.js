import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "gatsby";
import { Div, PageContainer } from "../components/cssComponents";

export default function FourOhFour(props) {
  console.log("props in 404", props);
  return (
    <PageContainer>
      <Div>
        <h2 style={{ marginTop: "100px" }}>
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
    </PageContainer>
  );
}
