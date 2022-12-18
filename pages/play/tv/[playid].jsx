import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
const Player = dynamic(() => import("../../../components/Player"), {
  ssr: false,
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function getServerSideProps(context) {
  let { playid } = context.params
  let { id } = context.query
//   console.log(playid)
//   let epid_split = playid.split('-')
//   let epid = epid_split[epid_split.length - 1]
  const req = await fetch(`https://cinehub-v2-backend.vercel.app/api/watch?id=tv/${playid}&epid=${id}`)
  const res = await req.json()
  return {
    props: { stream_data: res }, // will be passed to the page component as props
  }
}

function PlayTVID(props) {
  const { stream_data } = props
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

export default PlayTVID;
