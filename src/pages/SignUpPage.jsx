import { SignUp } from "../components/UserForms";
import { changeTitle } from "../handlers";

export const SignUpPage = () => {
  changeTitle("Blog: Sign Up");
  return <SignUp />;
};
