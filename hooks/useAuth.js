import { useEffect } from "react";
import { useRouter } from "next/router";
import useRemoteProfile from "./remote/useRemoteProfile";

const useAuth = () => {
  const router = useRouter();
  const { data } = useRemoteProfile();
  useEffect(() => {
    if (data) router.push("/");
  }, [data]);
};

export default useAuth;
