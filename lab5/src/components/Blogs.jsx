import React from "react";
import { useState } from "react";
import "../css/Blogs.css";

const Blogs = ({ data }) => {
  const [vote, setVote] = useState(data.vote);
  const [cooldown, setCooldown] = useState(false);

  const increment = () => {
    if (cooldown) return coolDownError();
    if (vote >= 4) return alert("Maximum upvote !!");
    // Start vote to 1
    setVote(Math.max(vote + 1, 1));
    coolingDown();
  };

  const decrement = () => {
    if (cooldown) return coolDownError();
    if (vote <= 0) return alert("Minimum upvote !!");
    setVote(vote - 1);
    coolingDown();
  };

  const coolingDown = (sec = 1000) => {
    setCooldown(true);
    setTimeout(() => {
      setCooldown(false);
    }, sec);
  };

  const coolDownError = () => {
    return alert("Chotto Matte!! Don't vote too fast.");
  };

  const voteNumColor = (vote) => {
    if (vote <= 0) {
      return "text-gray-400";
    } else if (vote === 4) {
      return "text-green-600";
    } else return "";
  };

  return (
    <div
      id={data.name || ""}
      className="border-b border-gray-200 h-screen flex flex-row p-6 m-4 shadow bg-white rounded-lg"
      style={{ height: "calc(100vh - 2rem)" }}
    >
      <div className="flex flex-col items-center text-xl py-4 pr-4 border-gray-200 border-r">
        <a className="border-b border-gray-200 mb-4 pb-4" href={data.linkedin} target="_blank" rel="noreferrer">
          <figure>
            <img
              src={data.pictureUrl}
              alt={data.pictureUrl}
              className="w-14 h-14 rounded-full"
            />
          </figure>
        </a>


        <div className="icon-wrapper">
          <i
            onClick={increment}
            className="mdi mdi-thumb-up hover:text-green-600  icon"
          />
        </div>
        <p className={`${voteNumColor(vote)} my-3 w-20 font-bold`}>
          {vote < 0 ? "No vote" : vote}
        </p>
        <div className="icon-wrapper">
          <i
            onClick={decrement}
            className="mdi mdi-thumb-down hover:text-red-600 icon"
          />
        </div>
      </div>
      <div className="blogs-wrapper">
        <h className="blogs-name">{data.name || "Anonymous"}</h>
        <h className="blogs-no">{data.no}</h>
        <h2 className="blogs-content">{data.content || "Empty"}</h2>
        <div className="flex-grow"></div>
        <div className="blogs-carousel">
          {data.carousel.map((el) => (
            <figure key={el}>
              <img src={el} alt={el}></img>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
