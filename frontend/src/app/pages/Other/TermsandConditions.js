import React from "react";
import { Link } from "react-router-dom";

function TermsandConditions() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-[3%] pb-[1%]">
        <Link to="/">
          <img
            src="../logo.png"
            className="w-[3vw]"
            alt="Cozy Aesthetic Wallpaper"
          />
        </Link>
        <h1 className="text-[2.5vw] font-medium mt-[0.6vw] mb-[0.3vw] text-white">
          Terms and Conditions
        </h1>
        <p className="text-[0.9vw] text-white/60 w-[55ch] text-center">
          Discover the latest articles featuring mobile wallpaper trends,
          aesthetic design tips, and creative insights.{" "}
          <span className="text-white">
            Explore now at{" "}
            <a
              className="text-[#2196F3] underline"
              href="https://www.cozyaestheticwallpaper.com/"
              target="_"
            >
              cozyaestheticwallpaper.com
            </a>
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center p-[3%] pb-[1%] text-white">
        <div className="flex flex-col w-[90ch]">
          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            Terms and Conditions for Cozy Aesthetic Wallpaper
          </h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            Welcome to Cozy Aesthetic Wallpaper. By accessing or using our
            website, you agree to abide by these terms.
          </p>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">1. Usage Rights</h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            All wallpapers and content are for personal, non-commercial use
            only. Redistribution without permission is prohibited.
          </p>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            2. Intellectual Property
          </h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            All content, including wallpapers and text, is the property of Cozy
            Aesthetic Wallpaper and is protected under copyright laws.
          </p>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            3. Website Modifications
          </h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            We reserve the right to update or discontinue the website or any
            part of it without notice.
          </p>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            4. Limitation of Liability
          </h2>
          <p className="text-[0.9vw] text-white/60 mb-[5vh]">
            We are not responsible for any direct, indirect, or incidental
            damages resulting from your use of the website.
          </p>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh] text-[#2196F3]">
            Stay inspired and explore beautiful wallpapers to elevate your
            digital experience!
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center p-[3%]">
        <p className="text-[13px] text-white/60">
          &copy; {new Date().getFullYear()} &nbsp;|&nbsp; All rights reserved
        </p>
        <p className="text-[13px] text-white/60 border-l pl-2 ml-2 hover:text-white transaction all duration-300">
          <a href="/PrivacyPolicy">Privacy Policy</a>
        </p>
        <p className="text-[13px] text-white/60 border-l pl-2 ml-2 hover:text-white transaction all duration-300">
          <a href="/TermsandConditions">Terms and Conditions</a>
        </p>
        <p className="text-[13px] text-white/60 border-l pl-2 ml-2 hover:text-white transaction all duration-300">
          <a href="/">Go to Home</a>
        </p>
      </div>
    </>
  );
}

export default TermsandConditions;
