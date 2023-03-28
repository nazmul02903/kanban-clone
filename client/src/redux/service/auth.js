import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://3001-nazmul02903-kanbanclone-jzrj3rk6abf.ws-us92.gitpod.io/",
  }),
  endpoints: (build) => ({
    loadUserByToken: build.query({
      query: () => `login`,
      credential: "include",
    }),
    login: build.mutation({
      query(body) {
        return {
          url: `login`,
          method: "POST",
          body,
        };
      },
    }),
    register: build.mutation({
      query(body) {
        return {
          url: `register`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});


export const { useLoadUserByTokenQuery, useLoginMutation, useRegisterMutation } = authApi;