import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useUserStore from "../store/useUserStore";
import { getServerSidePropsWithAuth } from "../utils/getServerSidePropsAuth";

const LoginPage = () => {
  useAuth();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const setLogin = useUserStore((state) => state.setLogin);

  const [, makeLogin] = useAxios(
    { url: "/auth/login", method: "POST" },
    { manual: true }
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    makeLogin({ data })
      .then((response) => {
        const { data: responseData } = response.data;
        setLogin(responseData.email, responseData.token);
        router.push("/");
        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.message);
      });
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://p.kindpng.com/picc/s/679-6790447_instagram-story-logo-for-location-hd-png-download.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to admin
            </h2>
          </div>
          {error && (
            <div className="w-full">
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Ups! </strong>
                <span class="block sm:inline">{error}</span>
                <span
                  class="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setError(false)}
                >
                  <svg
                    class="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-5">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register("email")}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? "...loading" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth;

export default LoginPage;
