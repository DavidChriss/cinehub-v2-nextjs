import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
const Player = dynamic(() => import("../../../components/Player"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  let { playid } = context.params
  let epid_split = playid.split('-')
  let epid = epid_split[epid_split.length - 1]
  const req = await fetch(`https://cinehub-v2-backend.vercel.app/api/watch?id=movie/${playid}&epid=${epid}`)
  const res = await req.json()
  return {
    props: { stream_data: res, epid }, // will be passed to the page component as props
  }
}

function PlayMovieID(props) {
  const { stream_data, epid } = props
  // const router = useRouter();
  // const { playid } = router.query;

  // const { data: info_data } = useSWR(
  //   playid
  //     ? `https://cinehub-v2-backend.vercel.app/api/info?id=movie/${playid}`
  //     : null,
  //   fetcher
  // );
  
  // const { data: stream_data } = useSWR(
  //   info_data
  //     ? `https://cinehub-v2-backend.vercel.app/api/watch?id=movie/${playid}&epid=${info_data.result.episodes[0].id}`
  //     : null,
  //   fetcher
  // );

  return (
    <div className="min-h-screen bg-[#282C37]">
      {stream_data && <Player stream_data={stream_data}/>}
    </div>
  );
}

export default PlayMovieID;
