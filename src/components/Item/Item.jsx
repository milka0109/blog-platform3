import { ShortenItem } from "../ShortenItem";

import styles from "./Item.module.scss";

export const Item = ({ article }) => (
  <div className={styles.item}>
    <ShortenItem article={article} />
  </div>
);
