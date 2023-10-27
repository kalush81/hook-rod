import styled from 'styled-components';

export const Div = styled.div`
  display: grid;
  place-items: center;
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 0 20px 0;
  padding-bottom: ${({ noBottomPadding }) => noBottomPadding && '0 '};
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
    grid-template-columns: ${({ responsive }) =>
      responsive ? '1fr 2fr;' : 'auto;'};
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
  .field {
    position: absolute;
    width: 100px;
    height: 100px;

    top: 0;
    margin: auto;
    left: calc(50% - 50px);
    bottom: -30vh;
    display: flex;
    justify-content: center;
    .mouse {
      background: rgba(255, 255, 255, 0.3);
      width: 50px;
      height: 90px;
      border: 3px solid #333;
      border-radius: 60px;
      position: relative;
      &::before {
        content: '';
        width: 12px;
        height: 12px;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        border-radius: 50%;
        opacity: 1;
        animation: wheel 2s infinite;
        -webkit-animation: wheel 2s infinite;
      }
    }

    @keyframes wheel {
      to {
        opacity: 0;
        top: 60px;
      }
    }

    @-webkit-keyframes wheel {
      to {
        opacity: 0;
        top: 60px;
      }
    }
  }
`;
