export default function Welcome() {
  return (
    <div className="flex flex-col lg:flex-row items-center px-[20px] lg:px-[120px] py-8">
      <div className="lg:w-1/2">
        <img src="./yess.png" alt="Welcome Image" className="max-w-full h-auto" />
      </div>
      <div className="lg:w-1/2 lg:pl-8 flex flex-col space-y-4">
        <div className="text-2xl text-center lg:text-left lg:text-6xl font-extrabold">
          BUILD YOUR SKILLS WITH OUR ONLINE COURSES
        </div>
        <div className="text-lg text-center lg:text-left text-gray-500">Lorem ipsum dolor sit amet consectetur. Egestas aliquam volutpat rutrum praesent varius enim enim.</div>
      </div>
    </div>
  );
}
