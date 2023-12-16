import React, { useState, useEffect } from 'react';
import { Slider } from '../components/Slider';
import { SEO } from '../components/Seo';
import GoogleMapReact from 'google-map-react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import Reservator from '../components/reservator-comps/Reservator.js';
import { TimeTable } from '../components/timetable-comps/TimeTable.js';
import { Div, PageContainer } from '../components/cssComponents/index.js';
import useFetch from '../hooks/useFetch.js';
import useWindowSize from '../hooks/useWindowSize';
import { useLocation } from '@reach/router';
import { Dog, Fish2, LocationDot } from '../assets/icons';
import { LakeTerms } from '../components/LakeTerms.js';

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
    numberOfPegs,
    lakeOtherImagesFiles,
    pegs: staticPegs,
    pegBasePrice,
    extraServices,
    downPaymentAsPercents,
    paymentOnline,
    paymentOnPlace,
  } = props.data.a;

  //console.log('lake extraservices in Lake', extraServices);

  const googleMapsProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 15,
  };
  const [mergedPegs, setMergedPegs] = useState(staticPegs);
  const [error, setError] = useState(null);
  const [servicesReservationsDATA, setServicesReservationsDATA] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const size = useWindowSize();

  const { get: getPegReservations, loading: loadingPegReservations } = useFetch(
    `https://hookandrod.herokuapp.com/api/lakes/lakeReservations/`
  );

  useEffect(() => {
    //console.log('lakeId in useEffect', lakeId);
    async function fetchData() {
      const data = await getPegReservations(lakeId);
      //console.log('peg reserv data', data);
      if (data.error) {
        return setError(data);
      }
      const mergedPegs = staticPegs.map((peg) => {
        const foundPegWithRes = data.find((res) => res.pegId === peg.pegId);
        if (foundPegWithRes) {
          return { ...peg, reservations: foundPegWithRes.reservations };
        } else {
          return { ...peg, reservations: [] };
        }
      });
      setMergedPegs(mergedPegs);
    }
    fetchData();
  }, [lakeId]);

  const { get: getServicesReservations, loading: loadingServicesReservations } =
    useFetch(
      `https://hookandrod.herokuapp.com/api/extraservices/reservations/`
    );

  useEffect(() => {
    async function fetchData() {
      const data = await getServicesReservations(lakeId);
      setServicesReservationsDATA(data);
    }
    fetchData();
  }, [lakeId]);

  return (
    <>
      {/* <ConfigProvider locale={plPL}> */}
      <PageContainer>
        <Div>
          <div className='breadcrumbs'>
            <Breadcrumb
            // items={[
            //   {
            //     title: <Link to={`/${voivodeship}`}>{voivodeship}</Link>,
            //   },
            //   {
            //     title: <Link to={`/${voivodeship}/${city}`}>{city}</Link>,
            //   },
            //   {
            //     title: (
            //       <span>
            //         {lakeName} <LocationDot />
            //       </span>
            //     ),
            //   },
            // ]}
            >
              <Breadcrumb.Item>sample1</Breadcrumb.Item>
              <Breadcrumb.Item>sample2</Breadcrumb.Item>
              <Breadcrumb.Item>sample3</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Div>

        <Slider lakeOtherImagesFiles={lakeOtherImagesFiles} />

        <div className='field'>
          <div className='arrow'></div>
        </div>

        {error ? (
          <h2>
            server odpowiedział błędem, coś poszło nie tak{' '}
            <p>error status : {error.status}</p>
            <p>error name : {error.error}</p>
            <p>error message: {error.message}</p>
          </h2>
        ) : (
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
                  extraServices={extraServices || []}
                  currentPath={currentPath}
                  servicesReservationsDATA={servicesReservationsDATA}
                />
              </div>
            </div>
          </Div>
        )}

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
        <LakeTerms lakeName={lakeName} />
      </PageContainer>
      {/* </ConfigProvider> */}
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
      paymentOnline
      paymentOnPlace
      downPaymentAsPercents
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
  }
`;

const Section = styled.section`
  width: 100%;
  .lowisko_regu {
    padding-bottom: 60px;
  }
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
