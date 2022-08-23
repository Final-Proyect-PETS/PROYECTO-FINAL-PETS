import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {

    const tokenn = localStorage.getItem("token")

  let auth = { token: tokenn ? true : false };

  console.log(auth.token)

  return (
    auth.token ? <Outlet/> : <Navigate to="/"/>
  );
};

export default PrivateRoutes
