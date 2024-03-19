import React from 'react';
import Card from '../learner profile/Card';

function Calendar(props) {


    const contentArray = Array.from({ length: 28 }, (_, index) => index);

  // Function to get the dates for the upcoming days of the week
  const getDatesForWeek = () => {
    const today = new Date(); // Get today's date
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const datesForWeek = [];

    // Loop through the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today); // Create a new date object for each day
      date.setDate(today.getDate() + i); // Set the date to the current day + i

      const day = daysOfWeek[date.getDay()]; // Get the day of the week
      const dayOfMonth = date.getDate(); // Get the day of the month

      // Determine the class name for styling based on the current date
      let className = 'text-darkg'; // Default styling for past days
      if (i === 0) className = 'bg-button text-white'; // Highlight today's date
      else if (date < today) className = 'text-darkg'; // Styling for past days

      datesForWeek.push({ day, dayOfMonth, className }); // Push the day, day of the month, and class name to the array
    }

    return datesForWeek;
  };

  const datesForWeek = getDatesForWeek(); // Get the dates for the upcoming week

  // Generate content for the calendar
  const content = [
    <span key="title" className="self-start text-lg font-bold mb-5">
      Here's Your Calendar for the week
    </span>,
    <hr key="line1" className="h-1 w-full"></hr>,
    <div key="calendar" className="w-full grid grid-cols-7 gap-2 rounded-3xl p-4 border border-1">
      {/* Render days of the week with their number in the month */}
      {datesForWeek.map(({ day, dayOfMonth, className }, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className={`rounded-full py-2 px-4 text-center ${className}`}>
            {day}
          </span>
          <span className={className}>{dayOfMonth}</span>
        </div>
      ))}
      {
        contentArray.map((element, index)=> {
            return  <span key={index} className="bg-elements text-sm flex justify-center items-center text-white rounded-full py-2 px-4 text-center">
            12:00
          </span>
        })
      }
    </div>
  ];

  return <Card content={content}></Card>;
}

export default Calendar;
