import React from "react";

function About({ bio }: { bio: string }) {
  return (
    <section className="mt-0 md:mt-20 flex flex-wrap md:flex-nowrap" id="about">
      <div className=" md:w-[70%] w-full p-2 md:p-25">
        <p className="text-element">{bio}</p>
        <br />
        {/* <h2 className="font-primary-font text-element">Story</h2> */}
        {/* <p className="text-element">{story}</p> */}
      </div>
    </section>
  );
}

export default About;
