import React from "react";
import Header from "../components/Header";

export const About_Page = () => {
  return (
    <section className="content-center">
      <div className="mb-10" />
      <Header title="About us" />
      <div className="mb-10">
        <h1>What is MovieDB?</h1>
        <p>
          Ans: MovieDB is a web app developed by Clement as a side project. It
          provides an easy way for user to search information of a movie.
        </p>
      </div>
      <div className="mb-10">
        <h1>What technology is used?</h1>
        <p>Ans: ReactJS, TailwindCSS</p>
      </div>
      <div className="mb-10">
        <h1>Are there any plans to expand this app?</h1>
        <p>
          Ans: Sure, there are features I still want to add but do not have time
          to add right now, I will definitely come back to add more features.
        </p>
      </div>
    </section>
  );
};

export default About_Page;
