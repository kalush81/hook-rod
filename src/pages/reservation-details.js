import React from 'react';
import { Button, Space, ConfigProvider } from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { RequestReservationForm } from '../components/RequestReservationForm';

//dayjs().set("hour", 12).set("minutes", 0).format("YYYY-MM-DD HH:MM");

const ReservatorSummary = ({
  startDateUI,
  endDateUI,
  numDays,
  numGuests,
  pegBasePrice,
  lakeName,
  options,
  totalPrice,
  paymentType,
}) => {
  return (
    <div className='reservation-summary-card'>
      <h2>Podsumowanie Rezerwacji</h2>
      <div>{lakeName}</div>
      <div>Całkowita długość pobytu : {numDays}</div>
      <div>
        {startDateUI} - {endDateUI}
      </div>
      <div>
        {numDays} x {pegBasePrice} zł
      </div>
      <div>Liczba osób : {numGuests}</div>
      <div>
        {numGuests} x {numDays * pegBasePrice} zł {'---------'}{' '}
        {numGuests * numDays * pegBasePrice}zł
      </div>
      <div>Opcje dodatkowe: {options.length < 1 && '- nie wybrano'}</div>
      <ul>
        {options.map((option) => {
          return (
            <li key={option.name}>
              <div>
                <p>{option.name}</p>
                <div>
                  {numDays} x {option.basePrice || 0} zł ----{' '}
                  {numDays * option.basePrice || 0} zł
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        Łączna kwota: {totalPrice}{' '}
        {paymentType === 'TRANSFER' ? 'płatne teraz' : 'płatne później'}
      </div>
      <div>Opłata rezerwcyjna: 10 zł płatne teraz</div>
      <div>Metoda płatności: {paymentType}</div>
    </div>
  );
};

//entire page
const ReservationDetails = (props) => {
  const [sD, eD] = props.location.state?.newReservationData?.dates || [];
  const {
    pegId,
    numDays,
    pegBasePrice,
    numGuests,
    lakeName,
    currentPath,
    options = [],
    totalPrice,
    paymentType,
  } = props.location.state?.newReservationData || {};
  const startDateUI = dayjs(sD?.$d).locale('pl').format('DD MMMM YYYY');
  const endDateUI = dayjs(eD?.$d).locale('pl').format('DD MMMM YYYY');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}>
      <WrapperWithGrid>
        <ReservatorSummary
          startDateUI={startDateUI}
          endDateUI={endDateUI}
          numDays={numDays}
          pegBasePrice={pegBasePrice}
          numGuests={numGuests}
          options={options}
          lakeName={lakeName}
          totalPrice={totalPrice}
          paymentType={paymentType}
        />
        <RequestReservationForm
          currentPath={currentPath}
          pegId={pegId}
          extraServicesReservations={options.map((option) => option.id)}
          numberOfPerson={numGuests}
          startDate={dayjs(sD?.$d)
            .set('hour', 12)
            .set('minute', 0)
            .format('YYYY-MM-DD hh:mm')}
          endDate={dayjs(eD?.$d)
            .set('hour', 12)
            .set('minute', 0)
            .format('YYYY-MM-DD hh:mm')}
          // numDays={numDays}
          cost={totalPrice + 10}
          paymentType={paymentType}
        />
        <Space className='site-button-ghost-wrapper' wrap>
          <Button type='primary' ghost onClick={() => window.history.back()}>
            powrot do rezerwacji
          </Button>
        </Space>
      </WrapperWithGrid>
    </ConfigProvider>
  );
};

const WrapperWithGrid = styled.div`
  display: grid;
  gap: 3em;
  width: 90%;
  max-width: 1000px;
  margin: 6em auto 8em;
  @media (min-width: 890px) {
    grid-template-columns: 1fr 1fr;
  }

  .reservation-summary-card {
    border-radius: 5px;
    padding: 2em;
    background: #c4c4c440;
    max-width: 476px;
    & > div {
      background: #6750a40d;
      // opacity: 0.05;
      margin: 1em 0;
      padding: 1em 0.5em;
      border-radius: 5px;
    }
  }

  .reservation-form-card {
    max-width: 476px;
  }
`;

export default ReservationDetails;
