import { React, useState, useEffect } from "react";
import Header from "../Header"
import movie_data from "../../data/movie_data";
import movie_crew from "../../data/movie_crew";

export const Detail = () => {
  const [detail, setDetail] = useState({
    title: null,
    director: null,
    writer: null,
    story: null,
    language: null,
    budget: null,
    revenue: null,
  });

  useEffect(() => {
    const { title, original_language, budget, revenue } = movie_data;
    const { crew } = movie_crew;
    const director = crew.find((person) => person.job === "Director").name;
    const writer = crew.find((person) => person.job === "Writer").name;
    const story = crew.find((person) => person.job === "Story").name;
    console.log(director + " " + writer + " " + story);
    setDetail({
      ...detail,
      title: title,
      director: director,
      writer: writer,
      story: story,
      language: original_language,
      budget: budget,
      revenue: revenue,
    });
  }, []);

  return (
    <div>
      <Header title="Detail"/>
      <div className="flex flex-col gap-3">
        {Object.keys(detail).map((key, index) => {
          return (
            <div key={index}>
              <p className="font-bold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </p>
              <p>{
              key == "revenue" || key == "budget" ? parseInt(detail[key]).toLocaleString('en-US', {style:'currency', currency: 'USD'}) : detail[key]
            }
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
