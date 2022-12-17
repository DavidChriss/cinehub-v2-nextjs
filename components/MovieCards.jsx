import React from "react";
import { Icon } from "@chakra-ui/icons";
import { BsDot } from "react-icons/bs";
import { Image, Shimmer } from "react-shimmer";

function MovieCards(props) {
  let { data, index } = props;
  return (
    <div key={index} className="pt-8 flex max-w-[200px]">
      <div className="bg-[#1f232c] pb-2 rounded-md">
        {/* <img
          className="hover:brightness-75"
          src={data.movie_poster}
          width={200}
          height={233}
          alt={data.movie_name}
        ></img> */}
        <Image
          NativeImgProps={{ className: "hover:brightness-75" }}
          src={data.movie_poster}
          alt={data.movie_name}
          fallback={<Shimmer width={200} height={233} />}
          fadeIn={true}
        />
        <div className="text-white text-xs p-2">
          <p className="font-semibold">{data.movie_name}</p>
          <div className="flex justify-between pt-1">
            <p>
              {data.rls_year}&nbsp;
              <Icon as={BsDot} />
              {data.movie_run_time}
            </p>
            <p>{data.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCards;
