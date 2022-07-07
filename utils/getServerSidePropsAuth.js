import { parseCookies } from "nookies";

export const getServerSidePropsWithAuth = async (context) => {
  const { _t: accessToken, _em: email } = parseCookies(context, { path: "/" });

  if (email && accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export const getServerSidePropsWithNoAuth = async (context) => {
  const { _t: accessToken, _em: email } = parseCookies(context, { path: "/" });

  if (!email && !accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export const fetcherWithContext = async (resource, context) => {
  const { _t: accessToken } = parseCookies(context);

  try {
    const response =
      (await axiosInstance.get) <
      T >
      (resource,
      accessToken
        ? {
            headers: {
              Authorization: `bearer ${accessToken}`,
            },
          }
        : undefined);

    return response.data;
  } catch (error) {
    return undefined;
  }
};
