import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BottomMenu from "./BottomMenu";
import {
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import { AppSidebar } from "../layout/app-sidebar";
import TopBar from "../../customComponents/layout/TopBar";

export default function Layout({
  children,
  wallpapers,
  filteredWallpapers,
  setFilteredWallpapers,
}) {
  const [activeTag, setActiveTag] = useState("All Wallpapers");
  return (
    <SidebarProvider>
      <main className="w-full">
        <TopBar activeTag={activeTag} />
        <div className="flex w-full items-start justify-center">
          <AppSidebar
            wallpapers={wallpapers}
            setFilteredWallpapers={setFilteredWallpapers}
            setActiveTag={setActiveTag}
          />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
