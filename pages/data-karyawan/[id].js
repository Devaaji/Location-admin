import React from "react";
import LineChartUser from "../../components/core/LineChartUser";
import DashboardSidebarAdmin from "../../components/DashboardSideBarAdmin";
import { fetcherWithContext } from "../../utils/getServerSidePropsAuth";
import useRemoteDetailKaryawan from "../../hooks/remote/useRemoteDetailKaryawan";

const Index = ({ id }) => {
  const { data, error } = useRemoteDetailKaryawan(id);
  if (error) return <div>failed to load</div>;
  const user = data?.data;
  if (!data) {
    return (
      <DashboardSidebarAdmin>
        <div className="w-full text-center">Loading...</div>
      </DashboardSidebarAdmin>
    );
  }
  return (
    <DashboardSidebarAdmin>
      <div className="flex">
        <div className="d mr-10 w-1/3 flex flex-col">
          <div className="text-lg font-semibold">Gambaran Umum Karyawan : </div>
          <div className="w-full h-96 shadow-lg rounded-md p-10 flex flex-row">
            <div className="border-x border-gray-300 w-full flex flex-col justify-center  items-center">
              <div className="flex flex-row items-center justify-center">
                <div className="bg-blue-500 w-2 h-2 border border-black mr-5"></div>
                <div className="font-semibold text-3xl text-center">
                  Total Kehadiran
                </div>
              </div>
              <div className="text-center font-bold text-5xl mb-3">
                {user.totalMasuk}
              </div>
            </div>
          </div>
        </div>
        <LineChartUser id={id} data={data} />
      </div>
      <div className="w-full text-center pt-10">
        <div className="border-b border-gray-200 shadow border">
          <table className="w-full">
            <thead className="bg-gray-50 border">
              <tr>
                <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                <th className="px-6 py-2 text-xs text-gray-500">IMEI</th>
                <th className="px-6 py-2 text-xs text-gray-500">Email</th>
                <th className="px-6 py-2 text-xs text-gray-500">Role</th>
                <th className="px-6 py-2 text-xs text-gray-500">
                  Tanggal Register
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="whitespace-nowrap">
                <td className="px-6 py-4 text-sm text-gray-500">{user.guid}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{user.imei}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{user.role}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.createdAt}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardSidebarAdmin>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const idKaryawan = `/attendance/${id}`;

  await fetcherWithContext(idKaryawan, context);

  return {
    props: {
      id: id,
    },
  };
};

export default Index;
