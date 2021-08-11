import { React, useState, useEffect } from "react";
import Header from "../Header";

export const Detail = ({ details, crew }) => {
  const [detail, setDetail] = useState({
    title: "unknown",
    directors: "unknown",
    writers: "unknown",
    stories: "unknown",
    language: "unknown",
    budget: "unknown",
    revenue: "unknown",
  });

  useEffect(() => {
    const { title, original_language, budget, revenue } = details;
    const directors = [];
    const writers = [];
    const stories = [];
    for(let i = 0; i < crew.length; ++i) {
      switch(crew[i].job) {
        case "Director":
          directors.push(crew[i].name);
          break;
        case "Writer":
          writers.push(crew[i].name);
          break;
        case "Story":
          stories.push(crew[i].name);
          break;
        default:
      }
    }

    setDetail({
      ...detail,
      title: title,
      directors: directors.length > 0 ? directors : "unknown",
      writers: writers.length > 0 ? writers : "unknown",
      stories: stories.length > 0 ? stories : "unknown",
      language: original_language,
      budget: budget,
      revenue: revenue,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mb-10">
      <Header title="Detail" />
      <div className="flex flex-col gap-3">
        {Object.keys(detail).map((key, index) => {
          return (
            <div key={index}>
              <p className="font-bold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </p>
              <p>
                {key === "revenue" || key === "budget"
                  ? parseInt(detail[key]).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  : detail[key]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
