import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cn from "classnames";

import { useSignUpUserMutation } from "../../redux/blog-api";
import { submitUserData } from "../../handlers";

import styles from "./form.module.scss";

export const SignUp = () => {
  const [signUpUser] = useSignUpUserMutation();
  const errorMessages = useSelector((state) => state.user.errorMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm({ defaultValues: { username: "", email: "", password: "", repeatPassword: "" } });
  const onSubmit = async (user) => {
    await submitUserData(user, signUpUser, dispatch, reset);
    if (isSubmitSuccessful) {
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

  const password = watch("password");
  const agreement = watch("agreement");

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Create new account</h2>
      {errorMessages.length > 0 ? <ol>{formError(errorMessages)}</ol> : null}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          <div className={styles.labelText}>Username</div>
          <input
            className={cn(styles.input, { [styles.errorInput]: errors.username })}
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Username"
            {...register("username", {
              required: "This field is required",
              minLength: { value: 3, message: "Your username needs to be at least 3 characters." },
              maxLength: { value: 20, message: "Your username must be no more than 20 characters." },
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: "You can only use lowercase English letters and numbers",
              },
            })}
          />
          {inputError("username")}
        </label>
        <label htmlFor="email">
          <div className={styles.labelText}>Email address</div>
          <input
            className={cn(styles.input, { [styles.errorInput]: errors.email })}
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Email Address"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[0-9a-z][a-z0-9._\-^s]*@[a-z]*\.[a-z]+/,
                message: "Email must be in the correct form",
              },
            })}
          />
          {inputError("email")}
        </label>
        <label htmlFor="password">
          <div className={styles.labelText}>Password</div>
          <input
            className={cn(styles.input, { [styles.errorInput]: errors.password })}
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
              minLength: { value: 6, message: "Your password needs to be at least 6 characters." },
              maxLength: { value: 40, message: "Your password must be no more than 40 characters." },
            })}
          />
          {inputError("password")}
        </label>
        <label htmlFor="repeatPassword">
          <div className={styles.labelText}>Repeat Password</div>
          <input
            className={cn(styles.input, { [styles.errorInput]: errors.repeatPassword })}
            type="password"
            id="repeatPassword"
            autoComplete="off"
            placeholder="Password"
            {...register("repeatPassword", {
              required: "This field is required",
              validate: (value) => value === password || "Passwords must match",
            })}
          />
          {inputError("repeatPassword")}
        </label>
        <label htmlFor="checkbox" className={cn(styles.label, styles.agreement)}>
          <input
            type="checkbox"
            id="checkbox"
            className={styles.checkbox}
            {...register("agreement", { required: true })}
          />
          <div className={styles.box} />
          <div className={styles.labelText}>I agree to the processing of my personal information</div>
        </label>
        <label htmlFor="submit">
          <input type="submit" id="submit" value="Create" className={styles.submit} disabled={!agreement} />
        </label>
      </form>
      <div className={styles.question}>
        Already have an account?{" "}
        <Link to="/sign-in" className={styles.redirect}>
          Sign In.
        </Link>
      </div>
    </div>
  );
};
