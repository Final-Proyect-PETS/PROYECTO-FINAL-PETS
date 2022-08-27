import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../redux/Actions";

const PrivateRoutes = () => {
  const tokenn = localStorage.getItem("token");

  const dispatch = useDispatch();

  const id = localStorage.getItem("id");

  const user = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  let admin = { user: user.isAdmin === true ? true : false };

  let auth = { token: tokenn ? true : false };

  return auth.token && admin.user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
