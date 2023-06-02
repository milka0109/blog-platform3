import { Article } from "../components/Article";
import { changeTitle } from "../handlers";

export const ArticlePage = () => {
  changeTitle("Blog: Article");
  return <Article />;
};
