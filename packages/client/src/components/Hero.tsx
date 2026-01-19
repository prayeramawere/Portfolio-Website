import React from "react";

type social = {
  link: string;
  url: string;
};
type data = [social: social[], name: string, role: string, bio: string];

function Hero({ data }: { data: data }) {
  const [social, name, role, bio] = data;
  return (
    <section className="w-full gap-3 flex flex-wrap justify-center md:block md:justify-start">
      <div className="w-full  flex gap-3 flex-wrap md:flex-nowrap">
        <div className="md:w-[40%] w-full flex justify-center ">
          <div className="outer-circle w-[350px] h-[400px] bg-out-secondary rounded-lg mt-10 md:ml-20 md:mt-20 md:ml-40">
            <div
              className="inner-circle  w-[270px] h-[400px] bg-out-secondary/25 rounded-lg mt-[-25px] md:ml-[-65px] bg-cover bg-center"
              style={{ backgroundImage: `url(../self.png)` }}
            ></div>
          </div>
        </div>

        <div className="headinfo md:flex  md:mt-[60px]  justify-start md:px-20 p-2 py-10 font-arial w-full md:w-[60%] ">
          {" "}
          <div className="text-start gap-4  pl-2 h-fit w-full">
            <h1 className="text-3xl md:text-5xl text-white items-center flex ">
              {name}
            </h1>
            <h2 className=" text-white-faint items-center flex font-bold text-md">
              {role}
            </h2>
            <p className="text-sm mt-4 text-white">{bio}</p>
            <button className="px-4 py-2 border-primary bg-primary shadow-sm  hover:border-2 mt-2 text-sm text-white transition-all duration-200 hover:bg-blue-400/15 hover:px-4 hover:py-2 cursor-pointer rounded-md">
              reach out
            </button>
          </div>
        </div>
      </div>

      <div className=" hidden md:block md:flex absolute text-right justify-end ml-[70%] gap-3 mt-5">
        {social.map((icon) => (
          <a key={icon.url} href={icon.link}>
            <img src={`../${icon.url}.png`} className=" social gap-3" />
          </a>
        ))}
      </div>
    </section>
  );
}

export default Hero;
