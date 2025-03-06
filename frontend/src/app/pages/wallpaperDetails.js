import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Info, Eye, Share2, Download } from "lucide-react";

const WallpaperDetails = ({ isOpen, onClose, wallpaper }) => {
  const [downloadCount, setDownloadCount] = useState(0);

  // Fetch wallpaper details, including the downloadCount
  useEffect(() => {
    const fetchWallpaperDetails = async () => {
      if (wallpaper?.id) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/wallpapers/${wallpaper.id}`
          );
          const data = await response.json();
          setDownloadCount(data.downloadCount || 0); // Update the download count
        } catch (error) {
          console.error("Error fetching wallpaper details:", error);
        }
      }
    };

    fetchWallpaperDetails();
  }, [wallpaper]);

  const handleDownload = async () => {
    try {
      // Increment the download count on the server
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/wallpapers/download/${wallpaper.id}/increment`,
        {
          method: "POST",
        }
      );

      // Optimistically update the count locally
      setDownloadCount((prev) => prev + 1);

      // Show a success toast
      toast.success("Thank you for downloading wallpaper!");
    } catch (error) {
      console.error("Error incrementing download count:", error);
      toast.error("An error occurred while starting the download.");
    }
  };

  if (!wallpaper) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-background border-background lg:rounded-[20px] md:rounded-[20px] sm:rounded-[20px] rounded-[20px] w-[600] min-[320px]:w-[350px]">
          <DialogHeader>
            {/* <DialogTitle>{wallpaper.title}</DialogTitle> */}
            <DialogDescription>
              <p className="w-full text-center text-[#FFF100] mb-2">
                {wallpaper.downloadCount} Downloads ✨
              </p>
              <div className="relative w-full aspect-[6/9] flex items-center justify-center overflow-hidden">
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
                  className="absolute inset-0 left-[17%] top-[2%] w-[65.5%] h-[95.8%] rounded-[25px] z-10 object-cover"
                />

                {/* Top Dynamic Island */}
                <img
                  src="StatusBar.svg"
                  alt="Dynamic Island"
                  className="absolute top-[3%] w-[67%] left-[15%] z-10 object-contain"
                />
                <img
                  src="Date_Widget.svg"
                  alt="Dynamic Island"
                  className="absolute top-[13%] w-[67%] left-[16%] z-10 object-contain"
                />
                {/* <img
                  src="time_iPhone.png"
                  alt="Dynamic Island"
                  className="absolute top-[3%] w-[67%] z-10 object-contain"
                /> */}

                {/* Bottom Section */}
                <img
                  src="Bottom.svg"
                  alt="Bottom Controls"
                  className="absolute bottom-[5%] w-[67%] z-10 object-contain"
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <a
                  className="bg-white rounded-full text-[17px] text-black hover:text-white bg-[#f39f5a] flex items-center justify-center gap-2 text-black py-3 mt-[20px] transition-transform duration-500 ease-in-out transform group-hover:scale-110 hover:bg-[#f39f5a]/[90%] w-[70%] "
                  href={`${
                    process.env.REACT_APP_API_URL
                  }/api/wallpapers/download/${wallpaper.url.split("/").pop()}`} // Get the filename from wallpaper URL
                  download // Just adding this as a safeguard to force the download
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5" /> Download Free
                </a>
                {/* Tags Section */}
                <div>
                  {wallpaper.tags && wallpaper.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {wallpaper.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* <img
                src={`${process.env.REACT_APP_API_URL}${wallpaper.url}`}
                alt={wallpaper.title}
                className="object-cover w-[290px] h-[644px] rounded-[10px] transition-transform duration-500 ease-in-out transform group-hover:scale-105"
              /> */}
              {/* {wallpaper.description} */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* <Dialog
        open={isOpen}
        onOpenChange={onClose}
        className="flex items-center"
      >
        <DrawerContent className="bg-background border-border h-full w-[600px]">
          <DrawerHeader className="p-9">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-[50px] block text-white bg-transparent border-transparent hover:bg-transparent hover:text-white flex items-center"
            >
              <ArrowLeft /> Back
            </Button>
            <DrawerTitle>{wallpaper.title}</DrawerTitle>
            <DrawerDescription>Wallpaper ID: {wallpaper._id}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <img
              src={`${process.env.REACT_APP_API_URL}${wallpaper.thumbnailUrl}`}
              alt={wallpaper.title}
              className="object-cover w-[250px] h-[350px] rounded-[10px] transition-transform duration-500 ease-in-out transform group-hover:scale-105"
            />
          </div>
        </DrawerContent>
      </Dialog> */}
    </>
  );
};

export default WallpaperDetails;
