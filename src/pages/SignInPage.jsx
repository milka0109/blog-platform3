import { SignIn } from "../components/UserForms";
import { changeTitle } from "../handlers";

export const SignInPage = () => {
  changeTitle("Blog: Sign In");
  return <SignIn />;
};
