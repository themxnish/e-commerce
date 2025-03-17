import React from "react";

const Banner = () => {
  return (
    <div 
      className="w-full h-[40vh] sm:h-[50vh] flex items-center justify-center text-white border border-black bg-cover bg-center hover:scale-101 transition-all duration-300 animate-fadeIn"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/8007354/pexels-photo-8007354.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load')" }}
    >
      <div className="flex flex-col items-center text-center px-6 max-w-2xl mx-auto py-5">
          <h1 className="text-4xl sm:text-4xl font-bold tracking-wide">Shop. Save. Smile.</h1>
          <p className="text-lg sm:text-xl mt-4 font-semibold">Discover fabrics fashion at affordable prices.</p>

          <a href="/collection" className="inline-block bg-white text-black py-2 px-5 mt-6 text-lg font-bold rounded-[25px] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">Shop Now</a>
      </div>
    </div>
  );
};

export default Banner;