import useSWR from "swr";
import useUserStore from "../../store/useUserStore";

const useRemoteDetailKaryawan = (id) => {
  const uri = id ? `/attendance/${id}` : null;
  const { data, error, ...other } = useSWR([
    uri,
    useUserStore.getState().accessToken,
  ]);

  return { data, error, ...other };
};

export default useRemoteDetailKaryawan;
