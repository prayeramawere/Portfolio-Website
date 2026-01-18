import React from "react";
type social = {
  link: string;
  url: string;
};

function Contact({ social }: { social: social[] }) {
  return (
    <section className="mt-4 ">
      <div className=" flex  justify-center gap-3 mt-5">
        {social.map((icon) => (
          <a key={icon.url} href={icon.link}>
            <img
              src={`../${icon.url}.png`}
              className=" size-[60px] rounded-full bg-element hover:scale-110 transition-all duration-300 p-2 gap-3"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contact;
