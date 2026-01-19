import { useRef, useEffect, useState, type HTMLElementType } from "react";
import React from "react";
import { useInView } from "react-intersection-observer";

function About({ bio }: { bio: string }) {
  const { ref: myRef, inView } = useInView();
  return (
    <>
      <script type="script/js"></script>
      <section
        className={`mt-0 md:mt-20 text-white flex flex-wrap md:flex-nowrap `}
        id="about"
      >
        <div className=" md:w-[70%] w-full p-2 md:p-25">
          <h2
            ref={myRef}
            className={`text-white text-2xl ${inView ? "animate-fadeInUp delay-100 animate-once duration-500 trasition-all" : ""}`}
          >
            /About me
          </h2>
          <p
            ref={myRef}
            className={`text-element mt-2  ${inView ? "animate-fadeInUp delay-250 animate-once duration-500 trasition-all" : ""}`}
          >
            {bio}
          </p>
          <br />
          <p
            ref={myRef}
            className={` ${inView ? "animate-fadeInUp delay-3000 animate-once duration-500 trasition-all" : ""}`}
          >
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
        <div className="flex justify-center items-center md:w-[30%] w-full">
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
    </>
  );
}

export default About;
