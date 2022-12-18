import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Icon } from "@chakra-ui/icons";
import { AiFillStar } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Header from "../../components/Header";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function tvid() {
  const router = useRouter();
  const { tvid } = router.query;
  const { data: info_data } = useSWR(
    tvid
      ? `https://cinehub-v2-backend.vercel.app/api/info?id=tv/${tvid}`
      : null,
    fetcher
  );

  let seasonData = [];

  const unique = [
    ...new Set(info_data?.result.episodes.map((item) => item.season)),
  ];
  const seasonArr = unique.map((element) => {
    const filteredSeason = info_data?.result.episodes.filter(
      (item) => item["season"] == element
    );
    seasonData.push(filteredSeason);
  });
  //   const seasons = info_data?.result.episodes.filter((item) =>
  //     item['season']
  // )

  // console.log(seasonData);

  let first_ep = info_data?.result.episodes[0].id;

  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="md:px-40 py-8 bg-[#181B22] min-h-screen">
      <div className="px-8 aspect-auto">
        {info_data != null ? (
          <div className="py-4 flex">
            <img
              className="rounded-md hidden md:block"
              src={info_data.result.image}
              alt={info_data.result.name}
            />
            <div className="flex flex-col pl-6 flex-wrap">
              <p className="text-[#939ba2] text-5xl font-bold">
                {info_data.result.title}
              </p>
              <div className="flex space-x-2 pt-4">
                <p className="text-[#939ba2] text-base">
                  <Icon as={AiFillStar} />
                  {info_data.result.rating} |
                </p>
                <p className="text-[#939ba2] text-base">
                  {info_data.result.releaseDate} |
                </p>
                <p className="text-[#939ba2] text-base">
                  {info_data.result.duration} |
                </p>
                <p className="text-[#939ba2] text-base">
                  {info_data.result.genres.join(", ")}
                </p>
              </div>
              <p className="text-[#939ba2] text-base pt-4">
                {info_data.result.description.trim()}
              </p>
              <div className="flex pt-4">
                <p className="text-[#939ba2] text-base font-bold pr-2">
                  Starring:
                </p>
                <p className="text-[#939ba2] text-base">
                  {info_data.result.casts.join(", ")}
                </p>
              </div>
              <div className="flex pt-4">
                <p className="text-[#939ba2] text-base font-bold pr-2">
                  Country:
                </p>
                <p className="text-[#939ba2] text-base">
                  {info_data.result.country}
                </p>
              </div>
              {/* <div className="flex pt-4">
                <p className="text-[#939ba2] text-base font-bold pr-2">Tags:</p>
                <p className="text-[#939ba2] text-base">
                  {info_data.result.tags.join(" ")}
                </p>
              </div> */}
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

export default tvid;
