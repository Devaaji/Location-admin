import Link from "next/link";
import React from "react";
import DashboardSidebarAdmin from "../components/DashboardSideBarAdmin";
import useRemoteDataKaryawan from "../hooks/remote/useRemoteDataKaryawan";
import { TableKaryawan } from "../utils/table/TableName";

function DataKaryawanAdmin() {
  const { data: userKaryawan } = useRemoteDataKaryawan();

  return (
    <DashboardSidebarAdmin>
      <div className="w-full text-center">
        <div className="border-b border-gray-200 shadow border">
          <table className="w-full">
            <thead className="bg-gray-50 border">
              <tr>
                {TableKaryawan.map((table, i) => (
                  <th key={i} className="px-6 py-2 text-xs text-gray-500">
                    {table.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {userKaryawan?.data.map((user, i) => (
                <tr className="whitespace-nowrap" key={i}>
                  <td className="px-6 py-4 text-sm text-gray-500">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {user.imei ? user.imei : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/data-karyawan/${user.guid}`}>
                      <a className="px-4 py-1 text-sm text-white bg-blue-400 rounded">
                        Detail
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardSidebarAdmin>
  );
}

export default DataKaryawanAdmin;
