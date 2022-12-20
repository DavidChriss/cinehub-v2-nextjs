import React from "react";
import { Icon } from "@chakra-ui/icons";
import { AiFillStar } from "react-icons/ai";
import { FaPlay } from "react-icons/fa"
import dynamic from "next/dynamic";

import Header from "../../components/Header";
import Link from "next/link";

const Player = dynamic(() => import("../../components/Player"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  let { movieid } = context.params
  let epid_split = movieid.split('-')
  let epid = epid_split[epid_split.length - 1]
  const [data, streamData] = await Promise.all([
    (await fetch(`https://cinehub-v2-backend.vercel.app/api/info?id=movie/${movieid}`)).json(),
    (await fetch(`https://cinehub-v2-backend.vercel.app/api/watch?id=movie/${movieid}&epid=${epid}`)).json()
  ])
  return {
    props: { data, movieid, streamData }, // will be passed to the page component as props
  }
}

function movieidPage({ data, movieid, streamData }) {

  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="md:px-40 py-8 bg-[#181B22] min-h-screen">
      <div className="px-8 aspect-auto">
        {data != null ? (
          <div className="py-4 flex">
            {/* <img
              className="rounded-md hidden object-cover md:block"
              src={data.result.image}
              alt={data.result.name}
            /> */}
            <div className="flex flex-col flex-wrap ">
              <p className="text-[#939ba2] text-5xl font-bold">
                {data.result.title}
              </p>
              <div className="flex pt-4 flex-wrap text-[#939ba2]">
                <span className="text-[#939ba2] text-base">
                  <Icon as={AiFillStar} />
                </span>
                <span className="mx-1">{data.result.rating}</span>
                <span className="mx-2">|</span>
                <span className="text-[#939ba2] text-base">
                  {data.result.releaseDate}
                </span>
                <span className="mx-2">|</span>
                <span className="text-[#939ba2] text-base">
                  {data.result.duration}
                </span>
                <span className="mx-2">|</span>
                <span className="text-[#939ba2] text-base">
                  {data.result.genres.join(", ")}
                </span>
              </div>
              <p className="text-[#939ba2] text-base pt-4">
                {data.result.description.trim()}
              </p>
              <div className="flex pt-4">
                <p className="text-[#939ba2] text-base font-bold pr-2">
                  Starring:{" "}
                </p>
                <p className="text-[#939ba2] text-base">
                  {data.result.casts.join(", ")}
                </p>
              </div>
              <div className="flex pt-4">
                <p className="text-[#939ba2] text-base font-bold pr-2">
                  Country:{" "}
                </p>
                <p className="text-[#939ba2] text-base">
                  {data.result.country}
                </p>
              </div>
              {/* <Link href={`/play/movie/${movieid}`}>
              <h1 className="px-8 py-4 bg-[#282C37] inline-block mt-6 rounded-md font-bold text-white hover:bg-lime-500 hover:text-black"><Icon className="mr-3" as={FaPlay}/>Play</h1>
            </Link> */}
            </div>
          </div>
        ) : null}
              {streamData && streamData ?
        <Player data={streamData}/>: null}
      </div>
    </div>
    </div>
  );
}

export default movieidPage;
