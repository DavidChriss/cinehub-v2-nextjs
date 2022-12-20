import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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

  return (
    <div className="min-h-screen bg-[#282C37]">
      {stream_data && <Player stream_data={stream_data}/>}
    </div>
  );
}

export default PlayMovieID;
