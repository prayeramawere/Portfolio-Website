import React from "react";

function About({ bio }: { bio: string }) {
  return (
    <section
      className="mt-0 md:mt-20 text-white flex flex-wrap md:flex-nowrap"
      id="about"
    >
      <div className=" md:w-[70%] w-full p-2 md:p-25">
        <h2 className="text-white text-2xl">/About me</h2>
        <p className="text-element mt-2">{bio}</p>
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
      <div></div>
    </section>
  );
}

export default About;
