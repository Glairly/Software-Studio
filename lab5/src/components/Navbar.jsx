import React from "react";

const Navbar = ({ data }) => {
  return (
    <div
      className="flex flex-col justify-start shadow-md  text-white p-4 h-full w-64"
      style={{ background: "#222" }}
    >
      <div className="text-6xl font-bold">
        React <br /> is <br /> Easy
      </div>

      <div className="flex flex-col justify-center flex-grow">
        <p className="text-2xl">Content</p>
        <a className="underline-none p-2 border-b" href="#"></a>
        {data.map((el) => (
          <a
            className="underline-none p-2 border-b text-lg hover:font-bold"
            href={`#${el.name}`}
            key={el.name}
          >
            {el.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
