import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';
import { SEO } from '../components/seo';
import GoogleMapReact from 'google-map-react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { ConfigProvider, Breadcrumb } from 'antd';
import plPL from 'antd/lib/locale/pl_PL';
import { Collapse } from 'react-collapse';
import Reservator from '../components/Reservator.js';
import TimeTable from '../components/TimeTable';
import { Div, PageContainer } from '../components/cssComponents';
import useFetch from '../hooks/useFetch.js';
import useWindowSize from '../hooks/useWindowSize';
import { useLocation } from '@reach/router';
import { Dog, Fish2, LocationDot, Left, Right } from '../assets/icons';

//Nisko
const pegsDataMock = [
  {
    pegId: '3f11014b-f52d-43f4-84a1-7eef721d6cc5',
    pegName: 'Stanowisko 1',
    pegNumber: 1,
    reservations: [
      {
        startDate: '2023-10-26T12:00:00',
        endDate: '2023-10-27T11:59:00',
        status: 'PAID',
      },
    ],
  },
  {
    pegId: '3fe7bf92-dc29-49f0-9fb6-8da61de80ec7',
    pegName: 'Stanowisko 3',
    pegNumber: 3,
  },
  {
    pegId: '810c1f9b-11dd-4626-af27-302a37002f09',
    pegName: 'Stanowisko 5',
    pegNumber: 5,
  },
  {
    pegId: '8ab41a72-5a90-407c-a3d2-d384f6bad85d',
    pegName: 'Stanowisko 7',
    pegNumber: 7,
  },
  {
    pegId: '9412a235-d770-4a9d-83cc-8dd16d425e5f',
    pegName: 'Stanowisko 2',
    pegNumber: 2,
  },
  {
    pegId: 'aa5d3003-1c69-439b-bbfd-a6e3641ac4b8',
    pegName: 'Stanowisko 6',
    pegNumber: 6,
    reservations: [
      {
        startDate: '2023-10-25T12:00:00',
        endDate: '2023-10-26T11:59:00',
        status: 'PAID',
      },
    ],
  },
  {
    pegId: 'cfd04d40-0b00-4ffd-9e4e-5c09bf2bcf7d',
    pegName: 'Stanowisko 4',
    pegNumber: 4,
  },
];
const mapTitleStyle = {
  background: 'var(--litegray)',
  margin: 0,
  borderRadius: '10px 10px 0 0',
  padding: '5px',
  fontWeight: 300,
};

const title = {
  fontWeight: 300,
};

const Marker = ({ text }) => <LocationDot style={{ color: 'white' }} />;

function Lake(props) {
  const {
    voivodeship,
    city,
    name: lakeName,
    id: lakeId,
    latitude,
    longitude,
    facilities,
    numberOfPegs,
    lakeMainImageFile,
    lakeOtherImagesFiles,
    pegs: staticPegs,
    pegBasePrice,
    metadata,
    extraServices,
  } = props.data.a;
  const {
    lakeMainImageFile: firstThumbnail,
    lakeOtherImagesFiles: restThumbnails,
  } = props.data.b;

  const googleMapsProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 14,
  };
  const [mergedPegs, setMergedPegs] = useState(staticPegs);
  const [opened, setOpened] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const size = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(0);
  const matchedRef = useRef(null);
  const allImages = useRef([]);
  const allThumbnails = useRef([]);
  const toggleOpened = () => setOpened((value) => !value);

  const { get: getPegReservations, loading: loadingPegReservations } = useFetch(
    `https://hookandrod.herokuapp.com/api/lakes/lakeReservations/`
  );
  const { get: getServicesReservations, loading: loadingServicesReservations } =
    useFetch(`https://hookandrod.herokuapp.com/api/lakes/lakeReservations/`);

  // useEffect(() => {
  //   allImages.current = [lakeMainImageFile, ...lakeOtherImagesFiles];
  //   allThumbnails.current = [firstThumbnail, ...restThumbnails];
  //   allThumbnails.current = Array.from(
  //     { length: 10 },
  //     () => allThumbnails.current
  //   ).flat();
  // }, [lakeId]);

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

  useEffect(() => {
    async function fetchData() {
      const response = await getPegReservations(lakeId);
      console.log(response);
      const mergedPegs = staticPegs.map((peg) => {
        const foundPegWithRes = response.find((res) => res.pegId === peg.pegId);
        if (foundPegWithRes) {
          return { ...peg, reservations: foundPegWithRes.reservations };
        } else {
          return { ...peg, reservations: [] };
        }
      });
      setMergedPegs(mergedPegs);
    }
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, [lakeId]);

  return (
    <>
      <ConfigProvider locale={plPL}>
        <PageContainer>
          <Div>
            <div className='breadcrumbs'>
              <Breadcrumb
                items={[
                  {
                    title: <Link to={`/${voivodeship}`}>{voivodeship}</Link>,
                  },
                  {
                    title: <Link to={`/${voivodeship}/${city}`}>{city}</Link>,
                  },
                  {
                    title: (
                      <span>
                        {lakeName} <LocationDot />
                      </span>
                    ),
                  },
                ]}></Breadcrumb>
            </div>
          </Div>

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

          {/* <ThumbnailsWrapper>
            {restThumbnails.map((image, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    flushSync(() => {
                      if (index < allImages.current?.length - 1) {
                        setIndex((index) => index + 1);
                      } else {
                        setIndex(0);
                      }
                    });
                  }}>
                  <GatsbyImage
                    alt=''
                    image={getImage(image)}
                    style={{ minWidth: '100px' }}
                  />
                </div>
              );
            })}
          </ThumbnailsWrapper> */}

          <div className='field'>
            <div className='arrow'></div>
          </div>

          <Div>
            <div className='callendar-wraper'>
              <Section className='time-table'>
                <TimeTable
                  isLoading={loadingPegReservations}
                  id={lakeId}
                  pegs={mergedPegs}
                  maxPegs={numberOfPegs || 8 > 5 ? 5 : numberOfPegs}
                  maxDays={size}
                  numberOfPegs={numberOfPegs}
                />
              </Section>

              <div style={{ marginTop: '2em' }}>
                <Reservator
                  lakeName={lakeName}
                  pegs={loadingPegReservations || mergedPegs}
                  pegBasePrice={pegBasePrice}
                  extraServices={extraServices}
                  currentPath={currentPath}
                />
              </div>
            </div>
            {isError && <p>Cos poszlo nie tak podczas ladowania rezerwacji</p>}
          </Div>

          <Div>
            <div style={{ height: '50vh', width: '100%', margin: '3rem' }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyByN_9TGcmxwAZMkuAAGfWzXd7FZQAKYUw',
                }}
                defaultCenter={googleMapsProps.center}
                defaultZoom={googleMapsProps.zoom}
                options={{
                  mapTypeId: 'hybrid', // Set both map types
                }}
                yesIWantToUseGoogleMapApiInternals>
                <Marker lat={latitude} lng={longitude} />
              </GoogleMapReact>
            </div>
          </Div>
          <Div>
            <div className='facilities'>
              <h1 style={title}>Czego mozesz się spodziewać ?</h1>
              <ul className='facilities-list'>
                <li>
                  <Dog />
                  <p>Parking</p>
                </li>
                <li>
                  <Dog />
                  <p>Psy mile widziane</p>
                </li>
                <li>
                  <Dog />
                  <p>Łódka do wynajęcia</p>
                </li>
                <li>
                  <Dog />
                  <>Parking</>
                </li>
                <li>
                  <Dog />
                  <p>Parking</p>
                </li>
              </ul>
            </div>
          </Div>
          <Div>
            <div className='facilities'>
              <h1 style={title}>Jakie ryby występują na łowisku?</h1>
              <ul className='facilities-list'>
                <li>
                  <Fish2 />
                  <p>Karaś</p>
                </li>
                <li>
                  <Fish2 />
                  <p>Szczupak</p>
                </li>
                <li>
                  <Fish2 />
                  <p>Lin</p>
                </li>
                <li>
                  <Fish2 />
                  <p>Karp</p>
                </li>
                <li>
                  <Fish2 />
                  <p>Rybka</p>
                </li>
              </ul>
            </div>
          </Div>
          <Div>
            <Section>
              <div className='lowisko_regu'>
                <h2>Regulamin Łowiska</h2>
                <div className='lowisko_regu_body'>
                  <h3
                    className='text_toggle'
                    onClick={toggleOpened}
                    style={{ color: 'red' }}>
                    Regulamin Łowiska {lakeName} {opened ? ' v' : ' >'}
                  </h3>
                  <Collapse isOpened={opened}>{'regulations'}</Collapse>
                  <div className='text_toggle' onClick={toggleOpened}>
                    {opened ? 'Zwiń...' : 'Rozwiń...'}
                  </div>
                </div>
              </div>
            </Section>
          </Div>
        </PageContainer>
      </ConfigProvider>
    </>
  );
}

export const query = graphql`
  query lake($id: String) {
    a: lake(id: { eq: $id }) {
      voivodeship
      priceMin
      name
      city
      latitude
      longitude
      facilities {
        name
        basePrice
      }
      fishOnLake {
        length
        name
        weight
      }
      pegs {
        pegId
        pegName
        pegNumber
      }
      pegBasePrice
      id
      metadata {
        description
        keywords
      }
      extraServices {
        id
        name
        price
      }
      lakeMainImageFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      lakeOtherImagesFiles {
        childImageSharp {
          gatsbyImageData
        }
      }
      numberOfPegs
    }
    b: lake(id: { eq: $id }) {
      lakeMainImageFile {
        childImageSharp {
          gatsbyImageData(width: 100, quality: 100)
        }
      }
      lakeOtherImagesFiles {
        childImageSharp {
          gatsbyImageData(width: 100, quality: 100)
        }
      }
    }
  }
`;

const Section = styled.section`
  width: 100%;
  .lowisko_regu {
    padding-bottom: 60px;
  }
`;

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
const ThumbnailsWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  margin: 1rem;
`;

export default Lake;

export const Head = (props) => {
  return (
    <SEO
      description={props.data.a.metadata.description}
      title={props.data.a.name}
    />
  );
};
