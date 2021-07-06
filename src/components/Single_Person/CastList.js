import { React } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";

const CastList = ({ cast }) => {
  return (
    <div className="mb-10 w-full">
      <Header title="Cast" />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Year</th>
            <th>Title</th>
            <th>Character</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {cast.map((movie) => {
            const { id, release_date, title, character } = movie;
            return (
              <tr key={id} className="border-b-2">
                <td className="whitespace-nowrap py-2">
                  {release_date || "-"}
                </td>
                <td className="pl-5 py-2">
                  <Link to={`/movies/${id}`}>
                    <p className="hover:text-green-900">{title || "-"}</p>
                  </Link>
                </td>
                <td classNam="py-2">{character || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CastList;
