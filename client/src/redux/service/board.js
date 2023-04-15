import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://3001-nazmul02903-kanbanclone-jzrj3rk6abf.ws-us94.gitpod.io",
  }),
  tagTypes: ["board", "single"],
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
      providesTags: ["board", "single"],
    }),
    getSingleBoard: build.query({
      query: (boardId) => ({
        url: `/${boardId}`,
        credentials: "include",
      }),
      providesTags: ["single"],
    }),
    updateBoard: build.mutation({
      query: (body) => ({
        url: `${body.boardId}`,
        method: "PUT",
        credentials: "include",
        body,
      }),
      // invalidatesTags: ["single"],
    }),
    updatePosition: build.mutation({
      query: (body) => ({
        url: `/`,
        method: "PUT",
        credentials: "include",
        body,
      }),
    }),
    deleteBoard: build.mutation({
      query: (boardId) => ({
        url: `/${boardId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["board"],
    }),
    createSection: build.mutation({
      query: (boardId) => ({
        url: `/${boardId}/section`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["single"],
    }),
    deleteSection: build.mutation({
      query: (sectionId) => ({
        url: `/section/${sectionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["single"],
    }),
    updateSection: build.mutation({
      query: ({ sectionId, title }) => ({
        url: `/section/${sectionId}`,
        method: "PUT",
        credentials: "include",
        body: { title: title },
      }),
      // invalidatesTags: ["single"],
    }),
    createTask: build.mutation({
      query: (sectionId) => ({
        url: `/${sectionId}/task`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["single"],
    }),
    updateTask: build.mutation({
      query: ({taskId, title, content}) => ({
        url: `/task/${taskId}`,
        method: "PUT",
        credentials: "include",
        body: {title, content}
      }),
      invalidatesTags: ["single"],
    }),
    deleteTask: build.mutation({
      query: (taskId) => ({
        url: `/task/${taskId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["single"],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useGetSingleBoardQuery,
  useUpdateBoardMutation,
  useUpdatePositionMutation,
  useDeleteBoardMutation,
  useCreateSectionMutation,
  useDeleteSectionMutation,
  useUpdateSectionMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = boardApi;
