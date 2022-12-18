import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { Spinner } from "@chakra-ui/react";

// Import Components
import MovieCards from "./MovieCards";

function Trending() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://cinehub-v2-backend.vercel.app/api/movies/trending",
    fetcher
  );
  //   if (data) {
  //     console.log(data);
  //   }
  return (
    <div className="px-40 py-8 bg-[#181B22]">
      <div className="flex justify-between">
        <h1 className="text-white font-semibold text-4xl pl-8">Trending</h1>
        <a className="text-white text-sm pr-12" href="">
          View all
        </a>
      </div>
      <div className="flex flex-wrap gap-8 px-6">
        {data && data ? (
          data.result
          .filter((item, idx) => idx < 20)
            .map((data, index) => {
              return (
                <Link href={`/${data.movie_id}`}>
                <MovieCards data={data} index={data.movie_id}/>
                </Link>
              )
            })
        ) : null}
      </div>
    </div>
  );
}

export default Trending;
