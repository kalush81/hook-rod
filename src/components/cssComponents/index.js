import styled from 'styled-components';

export const Div = styled.div`
  display: grid;
  place-items: center;
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  .breadcrumbs {
    margin: 1rem;
  }
  //padding-bottom: ${({ nobottompadding }) => nobottompadding && '0 '};
  .callendar-wraper {
    margin-top: 7rem;
    width: 100%;
    display: grid;
    grid-template-columns: unset;
    gap: 1rem;
  }
  .facilities {
    margin: 3rem;
    width: 100%;
    background: var(--litegray);
    padding: 10px;
    border-radius: 10px;
  }
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
    .callendar-wraper {
      grid-template-columns: 2fr 1fr;
    }
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

  .field {
    position: absolute;
    width: 100px;
    height: 100px;
    //border 2px solid red;
    /* top: 200px; */
    margin: auto;
    left: calc(50% - 50px);
    bottom: 100px;
    display: flex;
    justify-content: center;
    /* .mouse {
      background: rgba(255, 255, 255, 0.5);
      width: 50px;
      height: 90px;
      border: 3px solid #fff;
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
    } */
    .arrow {
      width: 0;
      height: 40px;
      border: 4px solid #777;
      position: relative;
      animation: scroll 1.5s infinite;
      -webkit-animation: scroll 1.5s infinite;
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 100%;
        left: -5px;
        width: 1px;
        height: 10px;

        // triangle
        border-top: 20px solid #777;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
      }
    }

    @keyframes scroll {
      0% {
        height: 40px;
      }
      30% {
        height: 70px;
      }
      60% {
        height: 40px;
      }
    }

    @-webkit-keyframes scroll {
      0% {
        height: 40px;
      }
      30% {
        height: 70px;
      }
      60% {
        height: 40px;
      }
    }
  }
`;
