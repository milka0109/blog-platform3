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
  const rootPath = "/";
  const articlesPath = "articles";
  const articleSlugPath = "articles/:slug";
  const articleSlugEditPath = "articles/:slug/edit";
  const newArticlePath = "new-article";
  const signUpPath = "sign-up";
  const signInPath = "sign-in";
  const profilePath = "profile";
  const notFoundPath = "*";

  const router = createBrowserRouter([
    {
      path: rootPath,
      element: <Navigate to="/articles" replace />,
    },
    {
      path: rootPath,
      element: <LayoutPage />,
      children: [
        {
          path: articlesPath,
          element: <ListPage />,
        },
        {
          path: articleSlugPath,
          element: <ArticlePage />,
        },
        {
          path: articleSlugEditPath,
          element: <EditArticlePage />,
        },
        {
          path: newArticlePath,
          element: <CreateArticlePage />,
        },
        {
          path: signUpPath,
          element: <SignUpPage />,
        },
        {
          path: signInPath,
          element: <SignInPage />,
        },
        {
          path: profilePath,
          element: <ProfilePage />,
        },
        {
          path: notFoundPath,
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
