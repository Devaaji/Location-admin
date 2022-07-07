import { useMemo } from "react";
import useSWR from "swr";
import useUserStore from "../../store/useUserStore";

const useRemoteProfile = () => {
  const email = useUserStore((state) => state.email);

  const uri = email ? `/auth/me?email=${email}` : null;
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

export default useRemoteProfile;
