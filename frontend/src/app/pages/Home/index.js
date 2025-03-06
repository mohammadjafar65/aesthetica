import React, { useEffect, useState } from "react";
import Layout from "../../customComponents/layout/Layout";
import WallpaperDetails from "../wallpaperDetails";
import { Button } from "../../../components/ui/button";
import axios from "axios";

const HomePage = () => {
  const [wallpapers, setWallpapers] = useState([]); // All wallpapers
  const [filteredWallpapers, setFilteredWallpapers] = useState([]); // Filtered wallpapers
  const [loading, setLoading] = useState(true);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null); // State to hold selected wallpaper
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("All Wallpapers");

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/wallpapers`
        );
        const wallpapers = response.data.wallpapers; // Access the wallpapers array

        // Sort wallpapers by createdAt in descending order in the frontend as a backup
        const sortedWallpapers = wallpapers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setWallpapers(sortedWallpapers);
        setFilteredWallpapers(sortedWallpapers);

        console.error("Fetching wallpapers:", wallpapers);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching wallpapers:", error);
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, []);

  const handleWallpaperClick = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        Loading wallpapers...
      </p>
    );
  }

  return (
    <>
      <Layout
        wallpapers={wallpapers}
        filteredWallpapers={filteredWallpapers}
        setFilteredWallpapers={setFilteredWallpapers}
      >
        <div className="py-6 px-5 w-full max-sm:px-2 max-sm:py-4">
          <div className="grid gap-y-6 max-sm:gap-y-4 grid-cols-2 sm:grid-cols-3 min-[1024px]:grid-cols-4 min-[1380px]:grid-cols-6 min-[2560px]:grid-cols-7 justify-items-center">
            {filteredWallpapers.map((wallpaper) => (
              <div
                onClick={() => handleWallpaperClick(wallpaper)} // Open drawer with selected wallpaper data
                className="group relative cursor-pointer"
                key={wallpaper._id || wallpaper.id}
              >
                <div className="relative w-full aspect-[9/16] flex items-center justify-center overflow-hidden">
                  {/* iPhone Frame */}
                  <img
                    src="iPhone_Frame.png"
                    alt="iPhone Frame"
                    className="w-full h-full object-contain"
                  />

                  {/* Wallpaper */}
                  <img
                    src={`${process.env.REACT_APP_API_URL}${wallpaper.url}`}
                    alt={wallpaper.title}
                    loading="lazy"
                    className="absolute inset-0 left-[10.6%] top-[2%] w-[78.6%] h-[96%] rounded-[25px] max-sm:rounded-[20px] z-10 object-cover"
                  />

                  {/* Top Dynamic Island */}
                  <img
                    src="StatusBar.svg"
                    alt="Dynamic Island"
                    className="absolute top-[3%] w-[80%] z-10 object-contain"
                  />
                  <img
                    src="Date_Widget.svg"
                    alt="Dynamic Island"
                    className="absolute top-[13%] w-[80%] z-10 object-contain"
                  />

                  {/* Bottom Section */}
                  <img
                    src="Bottom.svg"
                    alt="Bottom Controls"
                    className="absolute bottom-[5%] w-[80%] z-10 object-contain"
                  />
                </div>

                {/* "New" Tag */}
                {wallpaper.isNew === 1 && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                      New
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <WallpaperDetails
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          wallpaper={selectedWallpaper}
        />
      </Layout>
    </>
  );
};

export default HomePage;
