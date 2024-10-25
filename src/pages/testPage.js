import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const noon = {
  hour: 12,
  minute: 0,
  second: 0,
};
const checkins = [1, 4, 6]; // Dni dostępne do zameldowania (poniedziałek, czwartek, sobota)
const checkouts = [2, 5, 0];

const MyRangePicker = () => {
  const [dates, setDates] = useState([null, null]); // Domyślnie oba pola są puste
  const [isStartFocused, setIsStartFocused] = useState(false);
  const [isEndFocused, setIsEndFocused] = useState(false);

  const disableDate = (current) => {
    if (!current) return false; // Zapobiega problemom, jeśli current będzie undefined
    const day = current.day();
    const now = dayjs();
    // Jeśli nie wybrano jeszcze żadnej daty, blokuj wszystkie dni poza checkins
    if (isStartFocused) {
      return !checkins.includes(day) || current.set(noon).diff(now) < 0; //+ dzien ktory nie jest pomiedzy startdate i enddate
    }
    if (dates[0] && isEndFocused) {
      return !checkouts.includes(day) || current.set(noon).diff(dates[0]) < 0;
    }
    if (!dates[0] && isEndFocused) {
      return !checkouts.includes(day) || current.set(noon).diff(now) < 0;
    }
    return false;
  };

  const handleRangeChange = (value) => {
    setDates(value);
    if (!value[0]) {
      setDates([null, null]);
    }
    /* wprowadzic zabezieczenie jesli data start jest pozniejsza niz data end, to znullowac end pozostawiajac start*/
    /*if range end > range start => setDates([date[0], null]) */
  };

  const handleClear = () => {
    setDates([null, null]);
  };
  const handleFocus = (e, { range }) => {
    if (range === 'start') {
      setIsStartFocused(true);
      setIsEndFocused(false);
    }
    if (range === 'end') {
      setIsStartFocused(false);
      setIsEndFocused(true);
    }
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <RangePicker
        order={false} //teraz jest mozliwe ustawienia start < end co nie jest logiczne dlatego nalezy to zmienic
        disabledDate={disableDate}
        value={dates}
        onCalendarChange={handleRangeChange} // onCalendarChange do obsługi zmian w kalendarzu (wybór dat)
        onFocus={handleFocus}
        onClear={handleClear}
      />
    </div>
  );
};

export default MyRangePicker;
