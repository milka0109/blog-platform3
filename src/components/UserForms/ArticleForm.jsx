import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

import { useCreateArticleMutation, useUpdateArticleMutation } from "../../redux/blog-api";
import { prepareErrorsText } from "../../handlers";
import { clearErrorMessages, setErrorMessages } from "../../redux/userSlice";

import styles from "./form.module.scss";

export const ArticleForm = ({
  slug = "",
  defaultValues = { title: "", description: "", body: "", tagList: [{ tag: "" }] },
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: "tagList" });

  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const errorMessages = useSelector((state) => state.user.errorMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (article) => {
    const tagsArray = [...article.tagList].map((item) => item.tag.trim()).filter((item) => item.length);
    const articleData = { ...article, tagList: tagsArray };

    if (slug) {
      updateArticle({ slug, article: articleData });
      navigate(`/articles/${slug}`);
    } else {
      const { error } = createArticle({ article: { ...articleData } }).unwrap();
      if (error) {
        const errorsArray = prepareErrorsText(error.data.errors);
        dispatch(setErrorMessages(errorsArray));
        return;
      }
      dispatch(clearErrorMessages());
      navigate("/articles", { replace: true });
    }
  };

  const inputError = (name) => {
    if (errors[name]) {
      return <div className={styles.errorMessage}>{errors[name].message}</div>;
    }
  };

  const formError = (messages) =>
    messages.map((item) => (
      <li key={item} className={styles.formError}>
        {item}
      </li>
    ));

  return (
    <div className={cn(styles.container, styles.articleContainer)}>
      <h2 className={styles.header}>{defaultValues.title ? "Edit article" : "Create new article"}</h2>
      {errorMessages.length > 0 ? <ol>{formError(errorMessages)}</ol> : null}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          <div className={styles.labelText}>Title</div>
          <input
            className={cn(styles.input, styles.inputArticle, { [styles.errorInput]: errors.username })}
            type="text"
            id="title"
            autoComplete="off"
            placeholder="Title"
            {...register("title", {
              required: "This field is required",
              maxLength: {
                value: 100,
                message: "Article title should be no more than 100 characters.",
              },
            })}
          />
          {inputError("title")}
        </label>
        <label htmlFor="description">
          <div className={styles.labelText}>Short description</div>
          <input
            className={cn(styles.input, styles.inputArticle, { [styles.errorInput]: errors.username })}
            type="text"
            id="description"
            autoComplete="off"
            placeholder="Short description"
            {...register("description", {
              required: "This field is required",
              maxLength: {
                value: 100,
                message: "Article description should be no more than 100 characters.",
              },
            })}
          />
          {inputError("shortDescription")}
        </label>
        <label htmlFor="body">
          <div className={styles.labelText}>Text</div>
          <textarea
            className={cn(styles.input, styles.inputArticle, styles.inputText, {
              [styles.errorInput]: errors.username,
            })}
            id="body"
            autoComplete="off"
            rows="10"
            placeholder="Text"
            {...register("body", { required: "This field is required" })}
          />
          {inputError("body")}
        </label>
        <div className={styles.labelArticle}>
          <div className={styles.labelText}>Tags</div>
          <div className={styles.tags}>
            <ul className={styles.tagList}>
              {fields.map((item, index) => (
                <li key={item.id} className={styles.tag}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Text"
                    {...register(`tagList.${index}.tag`)}
                  />
                  <button
                    type="button"
                    className={styles.tagBtn}
                    onClick={() => remove(index)}
                    disabled={fields.length <= 1}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={cn(styles.tagBtn, styles.addTagBtn)}
              onClick={() => append(undefined, undefined)}
              disabled={fields.length >= 10}
            >
              Add tag
            </button>
          </div>
        </div>
        <label htmlFor="submit" className={styles.labelArticle}>
          <input type="submit" id="submit" value="Send" className={styles.submit} />
        </label>
      </form>
    </div>
  );
};
