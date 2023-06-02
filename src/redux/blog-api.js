import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getCookie } from "../handlers";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  tagTypes: ["Articles", "Article"],
  endpoints: (build) => ({
    getArticleList: build.query({
      query: (offset) => ({
        url: `articles?limit=5&offset=${offset}`,
        headers: {
          Authorization: `Token ${getCookie("Token")}`,
        },
      }),
      providesTags: (result) =>
        result.articles
          ? [...result.articles.map(({ id }) => ({ type: "Articles", id })), { type: "Articles", id: "LIST" }]
          : [{ type: "Articles", id: "LIST" }],
    }),
    getArticle: build.query({
      query: (slug) => ({
        url: `articles/${slug}`,
        headers: {
          Authorization: `Token ${getCookie("Token")}`,
        },
      }),
      providesTags: (result) =>
        result.articles
          ? [...result.articles.map(({ id }) => ({ type: "Article", id })), { type: "Article", id: "ITEM" }]
          : [{ type: "Article", id: "ITEM" }],
    }),
    signUpUser: build.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    signInUser: build.mutation({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: "user",
        method: "PUT",
        headers: {
          Authorization: `Token ${getCookie("Token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    createArticle: build.mutation({
      query: (body) => ({
        url: "articles",
        method: "POST",
        headers: {
          Authorization: `Token ${getCookie("Token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
    updateArticle: build.mutation({
      query: ({ slug, article }) => ({
        url: `articles/${slug}`,
        method: "PUT",
        headers: {
          Authorization: `Token ${getCookie("Token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ article }),
      }),
      invalidatesTags: [
        { type: "Article", id: "ITEM" },
        { type: "Articles", id: "LIST" },
      ],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${getCookie("Token")}`,
        },
      }),
      invalidatesTags: [{ type: "Articles", id: "LIST" }],
    }),
    favoriteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "POST",
        headers: {
          Authorization: `Token ${getCookie("Token")}`,
          "content-type": "application/json",
        },
      }),
      invalidatesTags: [
        { type: "Article", id: "ITEM" },
        { type: "Articles", id: "LIST" },
      ],
    }),
    unFavoriteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${getCookie("Token")}`,
          "content-type": "application/json",
        },
      }),
      invalidatesTags: [
        { type: "Article", id: "ITEM" },
        { type: "Articles", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetArticleListQuery,
  useGetArticleQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
  useUpdateUserMutation,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} = blogApi;
