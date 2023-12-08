import React, { useState } from 'react';
import styled from 'styled-components';
import { Left, Right } from '../assets/icons';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export const Slider = ({ lakeOtherImagesFiles }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (value) => {
    let newIndex;
    if (value < 0) {
      newIndex = 0;
    } else if (value > lakeOtherImagesFiles.length - 1) {
      newIndex = lakeOtherImagesFiles.length - 1;
    } else {
      newIndex = value;
    }
    setActiveIndex(newIndex);
  };

  return (
    <BigImagesWrapper>
      <button
        onClick={() => updateIndex(activeIndex - 1)}
        className='left-arrow'>
        <Left />
      </button>
      <button
        onClick={() => updateIndex(activeIndex + 1)}
        className='right-arrow strong'>
        <Right />
      </button>
      {lakeOtherImagesFiles.map((imageFile, i) => {
        return (
          <div key={i}>
            <GatsbyImage
              imgStyle={{ transition: 'transform 1s' }}
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                transition: 'all 0.45s ease-out',
              }}
              alt=''
              placeholder='blured'
              className='gatsby-img-wraper'
              image={getImage(imageFile)}
              // loading='eager'
            />
          </div>
        );
      })}
    </BigImagesWrapper>
  );
};

const BigImagesWrapper = styled.div`
  display: flex;
  overflow-x: hidden;
  //width: 100vw;
  //border: 2px solid red;
  position: relative;

  .right-arrow,
  .left-arrow {
    display: grid;
    place-content: center;
    position: absolute;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.5);
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    border: none;
    cursor: pointer;
  }
  .right-arrow {
    right: 0;
    border-radius: 10px 0 0 10px;
  }
  .left-arrow {
    border-radius: 0 10px 10px 0;
  }
  .gatsby-img-wraper {
    width: 100vw;
    height: calc(100vh - 202px);
    // &::after {
    //   content: '';
    //   width: 50px;
    //   height: 100%;
    //   position: absolute;
    //   top: 0;
    //   left: 100%;
    //   transform: translateX(-100%);
    //   //border: 4px solid yellow;
    //   background: rgba(255, 255, 255, 0.5);
    // }
    // &::before {
    //   content: '';
    //   width: 50px;
    //   height: 100%;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   z-index: 2;
    //   //transform: translateX(100%);
    //   //border: 4px solid yellow;
    //   background: rgba(255, 255, 255, 0.5);
    // }
  }
`;
