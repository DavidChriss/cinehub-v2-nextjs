import React from "react";
import { Icon } from "@chakra-ui/icons";
import { BsDot } from "react-icons/bs";
import { Image, Shimmer } from "react-shimmer";

function TVCards(props) {
  let { data, index } = props;
  return (
    <div key={index} className="pt-8 flex max-w-[200px]">
      <div className="bg-[#1f232c] pb-2 rounded-md">
        {/* <img
          className="hover:brightness-75"
          src={data.tv_poster}
          width={200}
          height={233}
          alt={data.tv_name}
        ></img> */}
        <Image
          NativeImgProps={{ className: "hover:brightness-75" }}
          src={data.tv_poster}
          alt={data.tv_name}
          fallback={<Shimmer width={200} height={233} />}
          fadeIn={true}
        />
        <div className="text-white text-xs p-2">
          <p className="font-semibold">{data.tv_name}</p>
          <div className="flex justify-between pt-1">
            <p>
              {data.season_num}&nbsp;
              <Icon as={BsDot} />
              {data.episode_num}
            </p>
            <p>
              {data.type}
              {/* <Icon className="mr-1" as={AiFillStar} />
            {data.vote_average.toFixed(1)} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TVCards;
