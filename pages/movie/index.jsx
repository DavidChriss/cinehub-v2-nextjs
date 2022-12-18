import React from "react";
import useSWR from "swr";
import Link from "next/link";

// Import Components
import MovieCards from "../../components/MovieCards";
import Header from "../../components/Header";

function Movies() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://cinehub-v2-backend.vercel.app/api/movies/popular?page=",
    fetcher
  );
  //   if (data) {
  //     console.log(data);
  //   }
  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="px-40 py-8 bg-[#181B22]">
        {/* <div className="flex justify-between">
        <h1 className="text-white font-semibold text-4xl pl-8">Trending</h1>
        <a className="text-white text-sm pr-12" href="">
          View all
        </a>
      </div> */}
        <div className="flex flex-wrap gap-8 px-6">
          {data && data
            ? data.result.filter((item, idx) => idx < 30).map((data, index) => {
                return (
                  <Link href={`/${data.movie_id}`}>
                    <MovieCards data={data} index={data.movie_id} />
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Movies;
