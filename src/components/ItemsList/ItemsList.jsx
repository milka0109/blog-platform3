import { Item } from "../Item";

import styles from "./ItemsList.module.scss";

export const ItemsList = ({ articles }) => {
  const articleList = articles.map((article) => (
    <li key={article.slug} className={styles["list-item"]}>
      <Item article={article} />
    </li>
  ));

  return <ul>{articleList}</ul>;
};
