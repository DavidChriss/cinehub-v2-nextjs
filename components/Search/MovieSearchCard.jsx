import React from 'react'
import { Image, Shimmer } from "react-shimmer";

function MovieSearchCard(props) {
    let { data, index } = props;
    return (
      <div key={index} className="pt-8 flex max-w-[200px]">
        <div className="bg-[#1f232c] pb-2 rounded-md hover:border-1 hover:border-[#84cc16]">
          <Image
            NativeImgProps={{ className: "hover:brightness-75" }}
            src={data.image}
            alt={data.title}
            fallback={<Shimmer width={200} height={233} />}
            fadeIn={true}
          />
          <div className="text-white text-xs p-2">
            <p className="font-semibold">{data.title}</p>
            <div className="flex justify-between pt-1">
              <p>{data.type}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default MovieSearchCard