import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center ml-auto ">
      <span className="text-2xl text-yellow-400">&#9733;</span> 
      <span className="ml-1 text-base">{rating}</span>
    </div>
  );
};

const Tutors = () => {
  // Assuming ratings for each tutor
  const tutorRatings = [
    { name: "Tutor 1", rating: 4.9 },
    { name: "Tutor 2", rating: 3.5 },
    { name: "Tutor 3", rating: 4.2 },
    { name: "Tutor 4", rating: 2.8 }
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 px-[20px] lg:px-[120px] py-8" >
        {/* Mapping through tutorRatings array to render each tutor card */}
        {tutorRatings.map((tutor, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <video controls className="w-full h-auto rounded-lg mb-2">
              <source src={`vid2.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex items-center justify-between">
              <div className="text-black font-bold">
                {tutor.name} {/* Tutor name */}
              </div>
              {/* Displaying star rating on the same line as tutor name */}
              <StarRating rating={tutor.rating} />
            </div>
            <div className="text-gray-500 text-sm mb-1">Subject: {index % 2 === 0 ? 'Math' : 'English'}</div>
            <div className="text-black text-sm">Experience: {index + 2} years</div>
          </div>
        ))}
      </div>

      {/* Additional Content */}
      <div className="text-center mt-8 bg-backg">
        <h2 className="text-button2 mb-8 text-3xl" style={{ fontFamily: 'Holtwood One SC' }}>Start Your Learning Journey</h2>
        <p className="text-gray-500 text-lg mb-8">Choose the tutor with the personality, professional experience, or area of interest you need!</p>
        <button className="bg-button2 hover:bg-[#DA7878] text-white font-bold py-4 px-28 lg:px-44 rounded-full mb-20">Start Learning</button>
      </div>
    </div>
  );
};

export default Tutors;
