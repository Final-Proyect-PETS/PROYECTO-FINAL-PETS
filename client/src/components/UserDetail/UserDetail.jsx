import { useDispatch, useSelector } from "react-redux";
import { useEffect, React } from "react";
import { clearState, getUserDetail } from "../../redux/Actions/index";
import NavBar from "../NavBar/NavBar";

export default function UserDetail(props) {
  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);

//   useEffect(() => {
//     dispatch(getUserDetail(props.match.params.id));
//     return () => dispatch(clearState());
//   }, [dispatch, props.match.params.id]);

  return (
    <>
      <NavBar />
      <div>UserDetail</div>
    </>
  );
}
