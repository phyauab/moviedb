import React from "react";

export const Card_Provider = ({ provider_name, logo_path }) => {
  //https://image.tmdb.org/t/p/w500/2DpMZHxP9jzu3v70bph1UD3LLv3.jpg
  return (
    <div className="w-32 shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <img src={`https://image.tmdb.org/t/p/w500${logo_path}`} alt="LOGO" />
      <h3 className="text-center p-2">{provider_name}</h3>
    </div>
  );
};

export default Card_Provider;
