import { useMemo } from "react";
import useSWR from "swr";
import useUserStore from "../../store/useUserStore";

const useRemoteLineChartAdmin = () => {
  const uri = `/attendance/total-attendance`;
  const { data, error, ...other } = useSWR([
    uri,
    useUserStore.getState().accessToken,
  ]);

  const newData = useMemo(
    () => (data ? { ...data, data: data?.data } : data),
    [data]
  );

  return { data: newData, error, ...other };
};

export default useRemoteLineChartAdmin;
