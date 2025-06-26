import React, { useState } from 'react';
import dayjs from 'dayjs';
import events from '../data/events.json';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();
  const today = dayjs();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(dayjs(new Date(currentDate.year(), currentDate.month(), d)));
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getEventsForDate = (date) => {
    return events.filter(e => dayjs(e.date).isSame(date, 'day'));
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-2xl rounded-xl p-8 max-w-6xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="text-xl px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          ←
        </button>
        <h2 className="text-3xl font-bold">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button
          onClick={nextMonth}
          className="text-xl px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 dark:text-gray-400 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 text-sm">
        {calendarDays.map((date, idx) => (
          <div
            key={idx}
            className={`h-28 rounded-xl border p-2 flex flex-col justify-start items-start overflow-hidden
              ${
                date?.isSame(today, 'day')
                  ? 'bg-blue-100 dark:bg-blue-700 border-blue-500'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }
              hover:shadow-lg transition duration-150`}
          >
            <div className="font-bold text-gray-800 dark:text-gray-100">
              {date ? date.date() : ''}
            </div>

            <ul className="mt-1 w-full space-y-1">
              {date &&
                getEventsForDate(date).map((e, i) => (
                  <li
                    key={i}
                    className="text-xs bg-green-300 dark:bg-green-600 text-green-900 dark:text-green-100 px-2 py-0.5 rounded-md truncate"
                    title={e.title}
                  >
                    {e.title}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
