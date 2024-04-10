import "./VideoCard.scss";

import Video from "../Video/Video";

export default function VideoCard({ url, channel, title }) {
  return (
    <>
      <section className="video__card">
        <Video url={url} />
        <div className="video__text">
          <h2 className="video__title">{title}</h2>
          <h2 className="video__name">{channel}</h2>
        </div>
      </section>
    </>
  );
}
