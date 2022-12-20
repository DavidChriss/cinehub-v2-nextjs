import Link from "next/link";
import React from "react";
import Header from "../../components/Header";
import MovieCards from "../../components/MovieCards";
import TVCards from "../../components/TVCards";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export async function getServerSideProps(context) {
  const [movieTop, tvTop] = await Promise.all([
    (await fetch('https://cinehub-v2-backend.vercel.app/api/movies/top-imdb?page=')).json(),
    (await fetch('https://cinehub-v2-backend.vercel.app/api/tv/top-imdb?page=')).json()
  ])
  return {
    props: { movieTopData: movieTop, tvTopData: tvTop }, // will be passed to the page component as props
  }
}

function TopIMDB({ movieTopData, tvTopData }) {
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
                {movieTopData && movieTopData
                  ? movieTopData.result.filter((item, idx) => idx < 30).map((data, index) => {
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
                {tvTopData && tvTopData
                  ? tvTopData.result.filter((item, idx) => idx < 30).map((data, index) => {
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
