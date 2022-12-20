import React from "react";
import Link from "next/link";

// Import Components
import TVCards from "../../components/TVCards";
import Header from "../../components/Header";

export async function getServerSideProps(context) {
  const req = await fetch(`https://cinehub-v2-backend.vercel.app/api/tv/popular?page=`)
  const res = await req.json()
  return {
    props: { data: res }, // will be passed to the page component as props
  }
}

function TV({ data }) {
  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="px-40 py-8 bg-[#181B22]">
        <div className="flex flex-wrap gap-8 px-6">
          {data && data
            ? data.result.filter((item, idx) => idx < 30).map((data, index) => {
                return (
                  <Link href={`/${data.tv_id}`}>
                    <TVCards data={data} index={data.tv_id} />
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default TV