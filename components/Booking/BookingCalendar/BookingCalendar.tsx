import React from 'react';
import moment from 'moment';
import { styled } from 'twin.macro';

import Calendar from 'react-calendar';

interface BookingCalendarProps {
  date: moment.Moment;
  setDate: (newDate: moment.Moment) => void;
  availableDates: Array<string>;
}

const BookingCalendar: React.FC<BookingCalendarProps> = (props) => {
  const { date, setDate, availableDates } = props;

  const today = moment();
  return (
    <StyledCalendar>
      <Calendar
        value={date.toDate()}
        view="month"
        onChange={(newDate: any) => {
          setDate(moment(newDate));
        }}
        tileDisabled={({ date: tileDate }) => {
          const formattedDate = moment(tileDate).format('YYYY-MM-DD');

          // Disabled conditions
          const isFullyBooked = !availableDates.includes(formattedDate);
          const isYesterday = moment(formattedDate).isBefore(today, 'D');
          return isFullyBooked || isYesterday;
        }}
        formatShortWeekday={(_, myDate) => parseCalendarDay(myDate)}
        prevLabel={<PrevLabel />}
        nextLabel={<NextLabel />}
        prev2Label={null}
        next2Label={null}
        minDate={today.toDate()}
        maxDate={
          new Date(today.toDate().setDate(today.toDate().getDate() + 30))
        }
      />
    </StyledCalendar>
  );
};

export default BookingCalendar;

const PrevLabel = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
    />
  </svg>
);

const NextLabel = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
    />
  </svg>
);

const StyledCalendar = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
  }
  .react-calendar__navigation {
    margin-top: 1.25rem;
    height: unset;
    justify-content: center;
    button {
      min-width: unset;
      svg > path {
        fill: #000000;
      }
      &:disabled {
        background: transparent;
        svg > path {
          fill: #c6c6c6;
        }
      }
    }
    .react-calendar__navigation__label {
      font-weight: 600;
      margin: 0 1.125rem;
      flex-grow: unset !important;
    }
  }
  .react-calendar__tile:disabled {
    background: none;
    color: #757575;
  }
  .react-calendar__tile--now {
    background: unset;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
  .react-calendar__month-view__weekdays__weekday {
    abbr {
      color: #757575;
      text-decoration: none;
    }
  }
`;

const parseCalendarDay = (date: Date) => {
  switch (date.getDay()) {
    case 0:
    case 6:
      return 'S';
    case 1:
      return 'M';
    case 2:
    case 4:
      return 'T';
    case 3:
      return 'W';
    case 5:
      return 'F';
    default:
      return '';
  }
};
