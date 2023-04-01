import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://3001-nazmul02903-kanbanclone-jzrj3rk6abf.ws-us93.gitpod.io/",
  }),
  endpoints: (build) => ({
    loadUserByToken: build.query({
      query: () => ({
        url: `login`,
        credentials: "include"
      })
    }),
    login: build.mutation({
      query(body) {
        return {
          url: `login`,
          method: "POST",
          credentials: "include",
          body,
        };
      },
    }),
    signup: build.mutation({
      query(body) {
        return {
          url: `register`,
          method: "POST",
          credentials: "include",
          body,
        };
      },
    }),
  }),
});


export const { useLoadUserByTokenQuery, useLoginMutation, useSignupMutation } = authApi;
