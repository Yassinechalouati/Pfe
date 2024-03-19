import React from 'react';

const Card = ({ image, title, subtitle1, subtitle2, rotation }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <img src={image} alt={title} className="w-full h-32 object-cover" />
        <div className="p-4">
          <h2 className="font-bold text-black mb-2">{title}</h2>
          <p className="text-darkg mb-1">{subtitle1}</p>
          <p className="text-darkg">{subtitle2}</p>
        </div>
      </div>
    </div>
  );
};

const CardList = ({ data }) => {
  const getRandomRotation = () => {
    // Generate a random number between -10 and 10 for rotation
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="flex overflow-y-hidden w-full px-4 overflow-x-auto py-4" style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
      {data.map((item, index) => (
        <Card key={index} {...item} rotation={getRandomRotation()} />
      ))}
    </div>
  );
};

const App = () => {
  // Example data for cards
  const cardsData = [
    {
      image: 'random.jpg',
      title: 'Intermediate Conversation Topics',
      subtitle1: 'INTERMEDIATE',
      subtitle2: '10 LESSONS',
    },
    {
      image: 'random.jpg',
      title: 'Intermediate Conversation Topics',
      subtitle1: 'INTERMEDIATE',
      subtitle2: '10 LESSONS',
    },
    {
      image: 'random.jpg',
      title: 'Intermediate Conversation Topics',
      subtitle1: 'INTERMEDIATE',
      subtitle2: '10 LESSONS',
    },
    {
      image: 'random.jpg',
      title: 'Intermediate Conversation Topics',
      subtitle1: 'INTERMEDIATE',
      subtitle2: '10 LESSONS',
    },
    {
      image: 'random.jpg',
      title: 'Intermediate Conversation Topics',
      subtitle1: 'INTERMEDIATE',
      subtitle2: '10 LESSONS',
    },
    {
      image: 'random.jpg',
      title: 'Intermediate Conversation Topics',
      subtitle1: 'INTERMEDIATE',
      subtitle2: '10 LESSONS',
    },
    // Add more card data as needed
  ];

  return (
    <div className="container text-center mx-auto px-[20px] lg:px-[120px] py-8">
      <CardList data={cardsData} />
      <div className="text-center text-button2 text-3xl mt-24" style={{ fontFamily: 'Holtwood One SC' }}>
        Courses for every skill level and interest
      </div>
      <div className="text-center text-darkg mt-4" >
        Focus on your specific goals with our guided courses, including academic test prep, conversation practice, and more.
      </div>
      <button className="bg-button2 hover:bg-[#DA7878] text-white font-bold py-6 px-28 lg:px-44 rounded-full mt-8 mb-8 text-2xl">Explore all courses</button>
      <div className="flex flex-col lg:flex-row items-center space justify-center lg:space-y-0 space-y-8 mt-8">
        {/* Profile Card 1 */}
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-6">
            <div className="flex justify-center">
              <img
                className="rounded-full h-20 w-20 object-cover mt-8 mb-4"
                src="chine.png" // Replace with the path to your image
                alt="Profile"
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">“Lorem ipsum dolor sit amet consectetur. Sit mi mollis suspendisse nisl venenatis. Tempus non convallis gravida enim eget. Porttitor pharetra vestibulum imperdiet nunc mi suspendisse. Cursus amet laoreet sed cursus volutpat nibh amet purus. Consectetur pharetra in eget lacus mattis et nisi.”</p>
              <p className="font-bold text-xl mt-8">John Doe</p>
              <p className="text-gray-600 text-sm mt-2">USA</p>
            </div>
          </div>
        </div>

        {/* Profile Card 2 */}
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden ml-4">
          <div className="px-4 py-6">
            <div className="flex justify-center">
              <img
                className="rounded-full h-20 w-20 object-cover mt-8 mb-4"
                src="logo.png" // Replace with the path to your image
                alt="Profile"
              />
            </div>
            <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">“Lorem ipsum dolor sit amet consectetur. Sit mi mollis suspendisse nisl venenatis. Tempus non convallis gravida enim eget. Porttitor pharetra vestibulum imperdiet nunc mi suspendisse. Cursus amet laoreet sed cursus volutpat nibh amet purus. Consectetur pharetra in eget lacus mattis et nisi.”</p>
                <p className="font-bold text-xl mt-8">Jane Smith</p>
              <p className="text-gray-600 text-sm mt-2">Canada</p>
            </div>
          </div>
        </div>

        {/* Profile Card 3 */}
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden ml-4">
          <div className="px-4 py-6">
            <div className="flex justify-center">
              <img
                className="rounded-full h-20 w-20 object-cover mt-8 mb-4"
                src="chine.png" // Replace with the path to your image
                alt="Profile"
              />
            </div>
            <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">“Lorem ipsum dolor sit amet consectetur. Sit mi mollis suspendisse nisl venenatis. Tempus non convallis gravida enim eget. Porttitor pharetra vestibulum imperdiet nunc mi suspendisse. Cursus amet laoreet sed cursus volutpat nibh amet purus. Consectetur pharetra in eget lacus mattis et nisi.”</p>
            <p className="font-bold text-xl mt-8">Alice Johnson</p>
              <p className="text-gray-600 text-sm mt-2">UK</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-button text-4xl lg:text-5xl mt-24 " style={{ fontFamily: 'Holtwood One SC' }}>
      Achieve your goals by learning English with LUNGUIFY
      </div>
      <button className="bg-button hover:bg-[#E69440] text-white font-bold py-6 px-32 rounded-full mt-8 mb-8 text-2xl">Start learning</button>

    </div>
  );
};

export default App;
