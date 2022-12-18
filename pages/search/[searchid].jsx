import Link from "next/link";
import React from "react";
import Header from "../../components/Header";
import MovieSearchCard from "../../components/Search/MovieSearchCard";
import TVSearchCard from "../../components/Search/TVSearchCard";

export async function getServerSideProps(context) {
  let { searchid } = context.params;
  const req = await fetch(
    `https://cinehub-v2-backend.vercel.app/api/search?q=${searchid}`
  );
  const res = await req.json();
  return {
    props: { data: res }, // will be passed to the page component as props
  };
}

function SearchPage(props) {
  let { data } = props;
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
            ? data.result.results.map((item, index) => {
                if (item.type == 'Movie') {
                    return (
                        <Link href={`/${item.id}`}>
                        <MovieSearchCard data={item} index={item.id} />
                      </Link>
                    )
                }
                else {
                    return (
                        <Link href={`/${item.id}`}>
                        <TVSearchCard data={item} index={item.id} />
                      </Link>
                    )
                }
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
