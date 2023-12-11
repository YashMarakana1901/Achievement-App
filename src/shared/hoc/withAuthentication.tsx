import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, TOKEN } from "../helper/constant";
import { getItemFromCookie } from "../helper/util";
import { UserProvider } from "../provider/user-provider/UserProvider";

const withAuthentication = (WrapedComponent: () => JSX.Element) => {
  const Component = () => {
    if (getItemFromCookie(TOKEN)) {
      return <WrapedComponent />;
    }
    return <Navigate to={"/login"} />;
  };

  return (
    <UserProvider>
      <Component />
    </UserProvider>
  );
};

export default withAuthentication;
