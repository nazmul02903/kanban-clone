import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://3001-nazmul02903-kanbanclone-jzrj3rk6abf.ws-us93.gitpod.io",
  }),
  tagTypes: ["board"],
  endpoints: (build) => ({
    createBoard: build.mutation({
      query: () => ({
        url: "/",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["board"],
    }),
    getBoards: build.query({
      query: () => ({
        url: "/",
        credentials: "include",
      }),
      providesTags: ["board"],
    }),
    getSingleBoard: build.query({
      query : (boardId) => ({
        url: `/${boardId}`,
        credentials: "include"
      })
    })
  }),
});

export const { useGetBoardsQuery, useCreateBoardMutation, useGetSingleBoardQuery } = boardApi;
