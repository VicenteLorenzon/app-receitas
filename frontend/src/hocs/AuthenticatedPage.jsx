import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import NavbarUser from "../components/NavbarUser";
import { AuthContext } from "../context/AuthContext";

const AuthenticatedPage = (PageComponent) => {
  return function WrappedComponent(props) {
    const { isLoggedIn } = useContext(AuthContext);

    return (
      <>
        {isLoggedIn ? <NavbarUser /> : <Navbar />}
        <PageComponent {...props} />
      </>
    );
  };
};

export default AuthenticatedPage;
