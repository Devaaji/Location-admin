import React from "react";
import DashboardSidebarAdmin from "../components/DashboardSideBarAdmin";
import dynamic from "next/dynamic";

const PageInputMap = () => {
  const MapWithNoSSR = dynamic(() => import("../components/MapsAdmin/"), {
    ssr: false,
  });

  return (
    <DashboardSidebarAdmin>
      <MapWithNoSSR />
    </DashboardSidebarAdmin>
  );
};

export default PageInputMap;
