import { useParams } from "react-router-dom";

import { useGetArticleQuery } from "../redux/blog-api";
import { changeTitle } from "../handlers";
import { ArticleForm } from "../components/UserForms";
import { useAuthCheck } from "../hooks";

export const EditArticlePage = () => {
  useAuthCheck();
  changeTitle("Blog: Edit Article");
  const { slug } = useParams();
  const { data, isLoading } = useGetArticleQuery(slug);

  if (isLoading) return <h2>Loading...</h2>;

  const { title, description, body, tagList } = data.article;
  const defaultTags = tagList.map((item) => ({ tag: item }));
  const defaultValues = { title, description, body, tagList: defaultTags };

  return <ArticleForm slug={slug} defaultValues={defaultValues} />;
};
