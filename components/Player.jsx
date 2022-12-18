import React, { useEffect, useState } from "react";
import {
  Player as VimePlayer,
  Video,
  Hls,
  DefaultUi,
  Ui,
  Poster,
} from "@vime/react";

const Player = (props) => {
  let { stream_data } = props

  let subs = stream_data["result"]["subtitles"];
  let video_url_arr = stream_data["result"]["sources"];
  const video_url = video_url_arr?.filter((url) => url.quality == "auto");
  return (
    <div>
      {video_url && (
        <VimePlayer
          theme="dark"
          style={{ "--vm-player-theme": "#84cc16" }}
        >
          <Hls crossOrigin>
            <source data-src={video_url[0].url} type="application/x-mpegURL" />
            {subs && subs.length > 0
              ? subs.map((element, index) => {
                  return (
                    <track
                      key={index}
                      kind="subtitles"
                      src={element.url}
                      label={element.lang}
                    />
                  );
                })
              : null}
          </Hls>
          <DefaultUi />
        </VimePlayer>
      )}
    </div>
  );
};

export default Player;
