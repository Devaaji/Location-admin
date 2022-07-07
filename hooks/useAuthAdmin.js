import { useRouter } from "next/router";
import useRemoteProfile from "./remote/useRemoteProfile";

const useAuthAdmin = () => {
  const router = useRouter();

  const { data } = useRemoteProfile();

  if (typeof window !== "undefined") {
    if (data?.data.role === "admin") {
      router.push("/");
    }
  }
};

export default useAuthAdmin;
