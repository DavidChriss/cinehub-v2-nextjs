import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Header from "../../components/Header";
import MovieCards from "../../components/MovieCards";
import TVCards from "../../components/TVCards";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function TopIMDB() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: movieTop } = useSWR(
    "https://cinehub-v2-backend.vercel.app/api/movies/top-imdb?page=",
    fetcher
  );
  const { data: TvTop } = useSWR(
    "https://cinehub-v2-backend.vercel.app/api/tv/top-imdb?page=",
    fetcher
  );
  //   if (data) {
  //     console.log(data);
  //   }
  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="px-40 py-8 bg-[#181B22]">
        <Tabs size={"lg"} variant={"unstyled"}>
          <TabList className="text-white font-bold inline-block">
            <Tab
              _selected={{
                color: "black",
                bg: "#84cc16",
              }}
            >
              Movies
            </Tab>
            <Tab
              _selected={{
                color: "black",
                bg: "#84cc16",
              }}
            >
              TV
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="flex flex-wrap gap-8">
                {movieTop && movieTop
                  ? movieTop.result.filter((item, idx) => idx < 30).map((data, index) => {
                      return (
                        <Link href={`/${data.movie_id}`}>
                          <MovieCards data={data} index={data.movie_id} />
                        </Link>
                      );
                    })
                  : null}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-wrap gap-8">
                {TvTop && TvTop
                  ? TvTop.result.filter((item, idx) => idx < 30).map((data, index) => {
                      return (
                        <Link href={`/${data.tv_id}`}>
                          <TVCards data={data} index={data.tv_id} />
                        </Link>
                      );
                    })
                  : null}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default TopIMDB;
