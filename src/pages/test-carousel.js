import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const TestCarousel = ({ data }) => {
  console.log('data', data.lake.lakeOtherImagesFiles);
  const images = data.lake.lakeOtherImagesFiles.map((im) => im);
  const allLakeImages = images;
  return (
    <div style={{ position: 'relative', top: '60px' }}>
      <Carousel
        showArrows={true}
        onChange={(params) => console.log(params)}
        showThumbs={false}
        // onClickItem={onClickItem}
        // onClickThumb={onClickThumb}
      >
        {allLakeImages.map((img) => {
          return (
            <div className='slider-div'>
              <GatsbyImage
                style={{ width: '100%', height: '70vh' }}
                image={getImage(img)}
              />
              {/* <p className='legend'>Legend 1</p> */}
            </div>
          );
        })}
        {/* <div>
          <img
            style={{ maxHeight: '60vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg'
          />
          <p className='legend'>Legend 1</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '60vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1800&t=st=1698249168~exp=1698249768~hmac=40dab9b8c73ef3c988dbed47e70c577f8bba7c0e4810641b3f2d9a961f5552b9'
          />
          <p className='legend'>Legend 2</p>
        </div>
        <div style={{ height: '70vh' }}>
          <img
            style={{ height: '100%  ', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/aerial-beautiful-shot-seashore-with-hills-background-sunset_181624-24143.jpg?w=1800&t=st=1698249479~exp=1698250079~hmac=6c0a609ecef866f51165ae2378780632fb9628924263c1b2468272e114cc05f7'
          />
          <p className='legend'>Legend 3</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?w=1480&t=st=1698249551~exp=1698250151~hmac=5734918de9aa226e131a959c7d69f6e1a093d58172003f77d9aa3b30412308fc'
          />
          <p className='legend'>Legend 4</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg'
          />
          <p className='legend'>Legend 1</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1800&t=st=1698249168~exp=1698249768~hmac=40dab9b8c73ef3c988dbed47e70c577f8bba7c0e4810641b3f2d9a961f5552b9'
          />
          <p className='legend'>Legend 2</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/aerial-beautiful-shot-seashore-with-hills-background-sunset_181624-24143.jpg?w=1800&t=st=1698249479~exp=1698250079~hmac=6c0a609ecef866f51165ae2378780632fb9628924263c1b2468272e114cc05f7'
          />
          <p className='legend'>Legend 3</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?w=1480&t=st=1698249551~exp=1698250151~hmac=5734918de9aa226e131a959c7d69f6e1a093d58172003f77d9aa3b30412308fc'
          />
          <p className='legend'>Legend 4</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg'
          />
          <p className='legend'>Legend 1</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?w=1800&t=st=1698249168~exp=1698249768~hmac=40dab9b8c73ef3c988dbed47e70c577f8bba7c0e4810641b3f2d9a961f5552b9'
          />
          <p className='legend'>Legend 2</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/aerial-beautiful-shot-seashore-with-hills-background-sunset_181624-24143.jpg?w=1800&t=st=1698249479~exp=1698250079~hmac=6c0a609ecef866f51165ae2378780632fb9628924263c1b2468272e114cc05f7'
          />
          <p className='legend'>Legend 3</p>
        </div>
        <div>
          <img
            style={{ maxHeight: '50vh', objectFit: 'cover' }}
            src='https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?w=1480&t=st=1698249551~exp=1698250151~hmac=5734918de9aa226e131a959c7d69f6e1a093d58172003f77d9aa3b30412308fc'
          />
          <p className='legend'>Legend 4</p>
        </div> */}
      </Carousel>
    </div>
  );
};

export default TestCarousel;

export const query = graphql`
  query lake($id: String) {
    lake(id: { eq: $id }) {
      lakeMainImageFile {
        childImageSharp {
          gatsbyImageData(width: 1000, quality: 100)
        }
      }
      lakeOtherImagesFiles {
        childImageSharp {
          gatsbyImageData(width: 1000, quality: 100)
        }
      }
    }
  }
`;
