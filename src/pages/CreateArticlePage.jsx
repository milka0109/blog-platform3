import { ArticleForm } from "../components/UserForms";
import { changeTitle } from "../handlers";
import { useAuthCheck } from "../hooks";

export const CreateArticlePage = () => {
  useAuthCheck();
  changeTitle("Blog: Create article");
  return <ArticleForm />;
};
