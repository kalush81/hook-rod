import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
                style={{
                  width: '100%',
                  height: 'calc(100vh - 160px)',
                }}
                image={getImage(img)}
              />
              {/* <p className='legend'>Jakiś opis</p> */}
            </div>
          );
        })}
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
