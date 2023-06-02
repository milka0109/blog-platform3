import { changeTitle } from "../handlers";
import { NotFound } from "../components/NotFound";

export const NotFoundPage = () => {
  changeTitle("Blog: Page not found");
  return <NotFound />;
};
