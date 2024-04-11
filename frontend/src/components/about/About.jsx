import React from "react";
import { MdMail } from "react-icons/md";

const About = () => {
  const email = (mailId) => {
    window.location = `https://mail.google.com/mail/?view=cm&fs=1&to=${mailId}`;
  };

  return (
    <>
      <div className="md:px-24 p-5 pt-10 pb-20 bg-slate-200 text-center">
        <h2 className=" text-slate-500 text-2xl my-5 italic">
          Get know about us
        </h2>
        <div className="border-t-4 border-slate-400 w-40 mx-auto rounded-full mb-5 -mt-3"></div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full bg-slate-400 md:p-10 p-5">
            <img src="/Qivee.png" alt="Qivee" className="w-64 mx-auto" />
            <p className="my-5 text-lg text-slate-800">Welcome to Qivee</p>
            <p className="text-slate-700 italic">
              Discover a world of style and functionality with our curated
              collection of bags. From sleek totes to versatile backpacks, we
              offer premium designs crafted to elevate your everyday adventures.
              Explore our range of quality materials and timeless designs,
              perfect for any occasion. Find your perfect match and make a
              statement with every step.
            </p>
          </div>
          <div className="w-full bg-white p-10">
            <div className="flex justify-around">
              <div>
                <img src="/Profile.png" alt="Qivee" className="size-36" />
                <p>Founder</p>
                <button
                  className="text-xl text-slate-500 p-2 rounded-full hover:text-white hover:bg-slate-500 duration-300"
                  onClick={() => email("hemantsh@gemail.com")}
                >
                  <MdMail />
                </button>
              </div>
              <div>
                <img src="/Profile.png" alt="Qivee" className="size-36" />
                <p>Co-founder</p>
                <button
                  className="text-xl text-slate-500 p-2 rounded-full hover:text-white hover:bg-slate-500 duration-300"
                  onClick={() => email("davidbroddy1@gemail.com")}
                >
                  <MdMail />
                </button>
              </div>
            </div>

            <p className="text-slate-700 m-4 italic">
              At Qivee, our passionate founders dedicated to blending style and
              utility, crafting premium bags to elevate your daily journey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
