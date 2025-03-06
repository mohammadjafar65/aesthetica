import { SidebarTrigger } from "../../../components/ui/sidebar";
import { useLocation } from "react-router-dom";

const TopBar = ({ activeTag }) => {
  const location = useLocation();

  return (
    <>
      <div className="w-full sticky top-0 z-20 backdrop-blur-md bg-[#18181B]/80 py-4 px-8 min-[320px]:px-5 border-b border-[216 34% 17%] flex items-center justify-between">
        <div className="flex items-center gap-3 min-[320px]:gap-2">
          <div className="flex items-center gap-3 min-[320px]:gap-2">
            <SidebarTrigger className="lg:hidden" />
            <img
              src="../logo.png"
              className="w-7"
              alt="Cozy Aesthetic Wallpaper"
            />
            <h1 className="text-[#EEEEEE] font-bold m-0 p-0 min-[320px]:text-[14px]">
              Cozy Aesthetic Wallpaper
            </h1>
            <p className="max-sm:hidden">|</p>
          </div>
          <h3 className="text-[#EEEEEE] max-sm:hidden">
            {activeTag && `${activeTag}`}
          </h3>
        </div>
        <a
          href="https://www.producthunt.com/posts/cozy-aesthetic-wallpapers?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-cozy&#0045;aesthetic&#0045;wallpapers"
          target="_blank" className="hidden md:block"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=698997&theme=neutral"
            alt="Cozy&#0032;Aesthetic&#0032;Wallpapers - Unleash&#0032;the&#0032;power&#0032;of&#0032;elegance&#0032;&#0038;&#0032;serenity&#0032;for&#0032;your&#0032;screen | Product Hunt"
            width="200"
            height="54"
          />
        </a>
      </div>
    </>
  );
};

export default TopBar;
