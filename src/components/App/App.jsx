import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import {
  LayoutPage,
  ArticlePage,
  ListPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  CreateArticlePage,
  EditArticlePage,
  NotFoundPage,
} from "../../pages";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/articles" replace />,
    },
    {
      path: "/",
      element: <LayoutPage />,
      children: [
        {
          path: "articles",
          element: <ListPage />,
        },
        {
          path: "articles/:slug",
          element: <ArticlePage />,
        },
        {
          path: "articles/:slug/edit",
          element: <EditArticlePage />,
        },
        {
          path: "new-article",
          element: <CreateArticlePage />,
        },
        {
          path: "sign-up",
          element: <SignUpPage />,
        },
        {
          path: "sign-in",
          element: <SignInPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
