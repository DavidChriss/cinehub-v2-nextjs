import React from "react";
import { Icon } from "@chakra-ui/icons";
import { AiFillStar } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Header from "../../components/Header";
import Link from "next/link";

export async function getServerSideProps(context) {
  let { tvid } = context.params
  const req = await fetch(`https://cinehub-v2-backend.vercel.app/api/info?id=tv/${tvid}`)
  const res = await req.json()
  return {
    props: { data: res, tvid }, // will be passed to the page component as props
  }
}

function tvidPage({ data, tvid }) {

  let seasonData = [];

  const unique = [
    ...new Set(data?.result.episodes.map((item) => item.season)),
  ];
  const seasonArr = unique.map((element) => {
    const filteredSeason = data?.result.episodes.filter(
      (item) => item["season"] == element
    );
    seasonData.push(filteredSeason);
  });

  let first_ep = data?.result.episodes[0].id;

  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="md:px-40 py-8 bg-[#181B22] min-h-screen">
      <div className="px-8 aspect-auto">
        {data != null ? (
          <div className="py-4 flex">
            {/* <img
              className="rounded-md hidden md:block"
              src={data.result.image}
              alt={data.result.name}
            /> */}
            <div className="flex flex-col pl-6 flex-wrap">
              <span className="text-[#939ba2] text-5xl font-bold">
                {data.result.title}
              </span>
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
                  Starring:
                </p>
                <p className="text-[#939ba2] text-base">
                  {data.result.casts.join(", ")}
                </p>
              </div>
              <div className="flex pt-4">
                <p className="text-[#939ba2] text-base font-bold pr-2">
                  Country:
                </p>
                <p className="text-[#939ba2] text-base">
                  {data.result.country}
                </p>
              </div>
              <Link href={`/play/tv/${tvid}?id=${first_ep}`}>
                <h1 className="px-8 py-4 bg-[#282C37] inline-block mt-6 rounded-md font-bold text-white hover:bg-lime-500 hover:text-black">
                  <Icon className="mr-3" as={FaPlay} />
                  Play
                </h1>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
      <div className="px-8">
        <Tabs size={"lg"} variant={'unstyled'} align={'center'}>
          <TabList className="text-white font-bold inline-block">
            {seasonData.map((item, index) => {
              return (
                <Tab
                  _selected={{
                    color: "black",
                    bg: "#84cc16",
                  }}
                >
                  {index + 1}
                </Tab>
              );
            })}
          </TabList>
          <TabPanels>
            {unique.map((elem, index) => {
              return (
                <TabPanel>
                  <div className="flex gap-2 flex-wrap">
                    {seasonData[index].map((item, index) => {
                      return (
                        <div>
                          <Link href={`/play/tv/${tvid}?id=${item.id}`}>
                            <h1 className="p-4 bg-[#282C37] inline-block mt-6 rounded-md font-bold text-white hover:bg-lime-500 hover:text-black">
                              <Icon className="mr-3" as={FaPlay} />
                              {item.season} x {item.number}
                            </h1>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </div>
    </div>
    </div>
  );
}

export default tvidPage;
