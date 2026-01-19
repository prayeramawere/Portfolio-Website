import { X } from "lucide-react";
import React, { useState } from "react";

function FloatingSocial({
  social,
}: {
  social: { url: string; link: string }[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={`w-10 md:hidden flex justify-center items-center flex-wrap  gap-2 mt-[-100%] rounded-full fixed mb-8 h-fit cursor-pointer ${open && "bg-primary"}`}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-center items-center"
      >
        {open ? (
          <X className="text-white social bg-primary!" />
        ) : (
          <img
            src={`../iyd.png`}
            className="  bg-white rounded-full object-cover object-center "
          />
        )}
      </div>
      {open && (
        <div className="">
          {social.map((icon) => (
            <a key={icon.url} href={icon.link}>
              <img src={`../${icon.url}.png`} className=" social mt-2" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default FloatingSocial;
