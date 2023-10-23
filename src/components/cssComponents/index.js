import styled from "styled-components";

export const Div = styled.div`
  display: grid;
  place-items: center;
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 0 20px 0;
  padding-bottom: ${({ noBottomPadding }) => noBottomPadding && "0 "};
  .facilities-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    li {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    li {
      font-size: 14px;
      font-weight: 500;
    }
  }
  .map-container {
    width: 100%;
  }
  @media (min-width: 900px) {
    grid-template-columns: ${({responsive}) => responsive ? "1fr 2fr;" : "auto;"}
    
  }
  .fishery-cards-wrapper {
    grid-template-columns: unset;

      @media (min-width: 660px) {
        gap: 1em;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }  
  }
`;

export const PageContainer = styled.div`
  padding: 60px 0 120px 0;
  //border: 4px solid red;
`;
