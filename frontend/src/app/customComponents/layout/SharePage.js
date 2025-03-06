import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const SharePage = () => {
  const { id } = useParams();
  const [wallpaper, setWallpaper] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.SHARE_APP_API_URL}/api/wallpapers/${id}`)
      .then((response) => {
        setWallpaper(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wallpaper:", error);
      });
  }, [id]);

  if (!wallpaper) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Helmet>
        <title>{wallpaper.title}</title>
        <meta property="og:title" content={wallpaper.title} />
        <meta
          property="og:description"
          content="Check out this amazing wallpaper!"
        />
        <meta
          property="og:image"
          content={`${process.env.SHARE_APP_API_URL}${wallpaper.thumbnailUrl}`}
        />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_WEBSITE_URL}/share/${id}`}
        />
      </Helmet>
      <div>
        <h1>{wallpaper.title}</h1>
        <img
          src={`${process.env.SHARE_APP_API_URL}${wallpaper.thumbnailUrl}`}
          alt={wallpaper.title}
        />
        <p>Visit our site to download more wallpapers!</p>
      </div>
    </>
  );
};

export default SharePage;
