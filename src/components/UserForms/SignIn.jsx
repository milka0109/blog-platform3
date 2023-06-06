import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";

import { useSignInUserMutation } from "../../redux/blog-api";
import { submitUserData } from "../../handlers";

import styles from "./form.module.scss";

export const SignIn = () => {
  const [signInUser] = useSignInUserMutation();
  const errorMessages = useSelector((state) => state.user.errorMessages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({ defaultValues: { username: "", email: "", password: "", repeatPassword: "" } });
  const location = useLocation();
  const redirectAddress = location.state?.from || "/articles";

  const onSubmit = async (user) => {
    await submitUserData(user, signInUser, dispatch, reset);
    if (isSubmitSuccessful) {
      navigate(redirectAddress, { replace: true });
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
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.header}>Sign In</h2>
        {errorMessages.length > 0 ? <ol>{formError(errorMessages)}</ol> : null}
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
            {...register("password", { required: "This field is required" })}
          />
          {inputError("password")}
        </label>
        <label htmlFor="submit">
          <input type="submit" id="submit" value="Log In" className={styles.submit} />
        </label>
      </form>
      <div className={styles.question}>
        Don’t have an account?{" "}
        <Link to="/sign-up" className={styles.redirect}>
          Sign Up.
        </Link>
      </div>
    </div>
  );
};
