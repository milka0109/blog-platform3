import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { setUserData, clearUserData } from "../../redux/userSlice";
import { deleteCookie, deleteStorageUser, getCookie, getStorageUser } from "../../handlers";
import defaultAvatar from "../../assets/img/avatar.png";

import styles from "./Header.module.scss";

export const Header = () => {
  const { username, image } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie("Token")) {
      dispatch(setUserData(getStorageUser()));
      return;
    }
    deleteStorageUser();
  }, []);
  const logOut = () => {
    deleteStorageUser();
    dispatch(clearUserData());
    deleteCookie("Token");
  };

  const loggedOut = (
    <>
      <Link to="/sign-in" className={styles.auth}>
        Sign In
      </Link>
      <Link to="/sign-up" className={classNames(styles.link, styles.signUp)}>
        Sign Up
      </Link>
    </>
  );
  const loggedIn = (
    <>
      <Link to="/new-article" className={styles.createArticle}>
        Create article
      </Link>
      <Link to="/profile" className={styles.user}>
        <span>{username}</span>
        <img src={image || defaultAvatar} alt="avatar" />
      </Link>
      <button type="button" className={styles.link} onClick={logOut}>
        Log Out
      </button>
    </>
  );

  return (
    <header className={styles.header}>
      <Link to="/articles" className={styles.title}>
        Realworld Blog
      </Link>
      {username ? loggedIn : loggedOut}
    </header>
  );
};
