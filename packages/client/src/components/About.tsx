import React from "react";

function About({ bio }: { bio: string }) {
  return (
    <section
      className="mt-0 md:mt-20 text-white flex flex-wrap md:flex-nowrap"
      id="about"
    >
      <div className=" md:w-[70%] w-full p-2 md:p-25">
        <h2 className="text-white text-2xl">/About me</h2>
        <p className="text-element mt-2 animate-out">{bio}</p>
        <br />
        <p>
          Here are some of the technologies im focusing on:
          <ul className="grid grid-cols-3 list-disc p-4">
            <li>Next Js</li>
            <li>React JS</li>
            <li>Express</li>
            <li>Flask</li>
            <li>Postgres</li>
            <li>Node js</li>
            <li>AI Integration</li>
            <li>...</li>
          </ul>
        </p>
      </div>
      <div className="flex justify-center items-center w-[30%]">
        <ul className="flex text-8xl font-primary-font animate-pulse">
          <li>C</li>
          <li>R</li>
          <li>E</li>
          <li>A</li>
          <li>T</li>
          <li>E</li>
        </ul>
      </div>
    </section>
  );
}

export default About;
