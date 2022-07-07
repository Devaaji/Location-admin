import LineChartAdmin from "../components/core/LineChart";
import DashboardSidebarAdmin from "../components/DashboardSideBarAdmin";
import { getServerSidePropsWithNoAuth } from "../utils/getServerSidePropsAuth";

export default function Home() {
  return (
    <DashboardSidebarAdmin>
      <div className="flex">
        <LineChartAdmin />
      </div>
    </DashboardSidebarAdmin>
  );
}

export const getServerSideProps = getServerSidePropsWithNoAuth;
