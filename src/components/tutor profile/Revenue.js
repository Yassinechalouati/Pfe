import React from 'react';
import Card from '../learner profile/Card';

function Revenue(props) {
  // Function to generate random integer between min (inclusive) and max (exclusive)
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Generate random revenue data
  const totalRevenue = getRandomInt(5000, 10000);
  const averageRevenuePerMonth = getRandomInt(200, 500);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const revenueByMonth = months.map(month => ({
    month,
    revenue: getRandomInt(100, 1000)
  }));

  const content = (
    <>
      <h2 className="text-2xl font-bold mb-4">Revenue Statistics</h2>
      <div className="flex justify-between w-full">
        <div className=" md:mr-4">
          <p className="text-darkg">Total Revenue:</p>
          <p className="text-3xl font-bold text-elements">${totalRevenue}</p>
        </div>
        <div className="md:mr-4">
          <p className="text-darkg">Avg Revenue/Month:</p>
          <p className="text-3xl font-bold text-elements">${averageRevenuePerMonth}</p>
        </div>
      </div>
      <div className="self-start w-full">
        <h3 className="text-lg text-center font-bold mb-2">Revenue by Month</h3>
        <ul>
          {revenueByMonth.map(({ month, revenue }) => (
            <li key={month} className="flex justify-between mb-2">
              <span className="text-darkg">{month}</span>
              <span className="text-elements">${revenue}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return <Card content={content}></Card>;
}

export default Revenue;
