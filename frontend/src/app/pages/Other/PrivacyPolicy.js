import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
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
          Privacy Policy
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
            Privacy Policy for Cozy Aesthetic Wallpaper
          </h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            At Cozy Aesthetic Wallpaper, your privacy is a priority. This
            Privacy Policy explains how we collect, use, and protect your
            information.
          </p>
          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            1. Information We Collect
          </h2>
          <ul className="pl-[1vw] list-disc text-white/60 flex flex-col gap-2 mb-[3vh]">
            <li>
              Personal Information:
              <br />
              When you subscribe, contact us, or download content, we may
              collect your name, email address, and preferences.
            </li>
            <li>
              Non-Personal Information:
              <br />
              This includes browser type, device information, and browsing
              patterns.
            </li>
          </ul>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            2. How We Use Your Information
          </h2>
          <ul className="pl-[1vw] list-disc text-white/60 flex flex-col gap-2 mb-[3vh]">
            <li>To improve user experience.</li>
            <li>
              To send updates, newsletters, and promotional emails (only with
              your consent).
            </li>
            <li>To analyze website usage for better service.</li>
          </ul>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            3. Protection of Information
          </h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            We implement secure systems and practices to protect your data
            against unauthorized access and misuse.
          </p>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            4. Third-Party Services
          </h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            We may link to third-party websites. We are not responsible for
            their privacy practices or content.
          </p>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">5. Your Consent</h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            By using this website, you agree to this Privacy Policy.
          </p>

          <h2 className="text-[1vw] font-[600] mb-[0.5vh]">
            6. Updates to This Policy
          </h2>
          <p className="text-[0.9vw] text-white/60 mb-[3vh]">
            We may update this policy periodically. Please review it to stay
            informed. If you have questions about this Privacy Policy, contact
            us at{" "}
            <a
              className="text-[#2196F3] underline"
              href="mailto:info@cozyaestheticwallpaper.com"
            >
              info@cozyaestheticwallpaper.com
            </a>
            .
          </p>
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

export default PrivacyPolicy;
