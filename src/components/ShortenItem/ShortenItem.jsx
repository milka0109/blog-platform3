import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Popconfirm, Tag } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useMemo, useRef } from "react";

import {
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} from "../../redux/blog-api";
import { formatDate, shortenWord } from "../../handlers";
import defaultAvatar from "../../assets/img/avatar.png";

import styles from "./ShortenItem.module.scss";

export const ShortenItem = ({ article, fullArticle = false }) => {
  const userAuth = useSelector((state) => state.user.username);
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unFavoriteArticle] = useUnFavoriteArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  const navigate = useNavigate();

  const { slug, title, favorited, favoritesCount, tagList, author, createdAt, description } = article;
  const { username, image } = author;

  const avatar = useMemo(() => image || defaultAvatar, [image, defaultAvatar]);

  const titleText = title.length ? title : "[anonymous article]";

  const articleRef = useRef();

  const isClicked = favorited ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />;
  const onToggleFavorite = async () => {
    if (!favorited) {
      favoriteArticle(slug);
    } else {
      unFavoriteArticle(slug);
    }
  };

  const onError = () => {
    articleRef.current.src = defaultAvatar;
  };

  const onDelete = () => {
    deleteArticle(slug);
    navigate("/articles", { replace: true });
  };

  const buttons = (
    <div className={styles.buttons}>
      <Popconfirm
        title=""
        description="Are you sure to delete this article?"
        placement="right"
        okText="Yes"
        cancelText="No"
        onConfirm={onDelete}
      >
        <button type="button" className={styles.delete}>
          <span>Delete</span>
        </button>
      </Popconfirm>
      <Link to="edit">
        <div className={styles.edit}>Edit</div>
      </Link>
    </div>
  );

  return (
    <article className={styles.article}>
      <div className={styles.item}>
        <header className={styles.header}>
          <Link to={`/articles/${slug}`} className={styles.link}>
            <span className={styles.title}>{shortenWord(titleText)}</span>
          </Link>
          <div className={styles.likes}>
            <Button
              icon={isClicked}
              type="ghost"
              className={styles.likeIcon}
              onClick={onToggleFavorite}
              disabled={!userAuth}
            />
            <span className={styles.likesCount}>{favoritesCount}</span>
          </div>
          <ul className={styles.tagsList}>
            {tagList.map((tag, index) => {
              const key = `${slug}${index}`;
              return (
                <li key={key}>
                  <Tag className={styles.tag}>{shortenWord(tag)}</Tag>
                </li>
              );
            })}
          </ul>
        </header>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{username}</span>
          <span className={styles.date}>{formatDate(createdAt)}</span>
          <img src={avatar} alt="avatar" className={styles.avatar} ref={articleRef} onError={onError} />
        </div>
        {userAuth === username && fullArticle && buttons}
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
};
