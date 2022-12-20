import React from "react";
import Link from "next/link";

// Import Components
import MovieCards from "./MovieCards";

function LatestMovies({data}) {
  return (
    <div className="px-40 py-8 bg-[#181B22]">
      {data && data ? (
        <div className="flex justify-between">
          <h1 className="text-white font-semibold text-4xl pl-8">
            Latest Movies
          </h1>
          <a className="text-white text-sm pr-12" href="">
            View all
          </a>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-8 px-6">
        {data && data ? (
          data.result
            .filter((item, idx) => idx < 20)
            .map((data, index) => {
              return (
                <Link href={`/${data.movie_id}`}>
                  <MovieCards data={data} index={data.movie_id} />
                </Link>
              );
            })
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default LatestMovies;
