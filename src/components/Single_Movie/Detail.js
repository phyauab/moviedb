import { React, useState, useEffect } from "react";
import Header from "../Header";

export const Detail = ({ details, crew }) => {
  const [detail, setDetail] = useState({
    title: "unknown",
    director: "unknown",
    writer: "unknown",
    story: "unknown",
    language: "unknown",
    budget: "unknown",
    revenue: "unknown",
  });

  useEffect(() => {
    const { title, original_language, budget, revenue } = details;
    var director = "unknown";
    var writer = "unknown";
    var story = "unknown";
    try {
      director = crew.find((person) => person.job === "Director").name;
    } catch (error) {
      console.log(error);
    }
    try {
      writer = crew.find((person) => person.job === "Writer").name;
    } catch (error) {
      console.log(error);
    }
    try {
      story = crew.find((person) => person.job === "Story").name;
    } catch (error) {
      console.log(error);
    }
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
    // eslint-disable-next-line
  }, []);

  return (
    <div>
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
