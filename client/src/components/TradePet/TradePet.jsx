import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPets, getAllUsers } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";

export default function TradePet() {
  const dispatch = useDispatch();
  const loggedProfile = useSelector((state) => state.userProfile); //este estado me lo toma sin useefect
  const userDetail = useSelector((state) => state.userDetail); //este no↑
  console.log(userDetail, "LOGGED");

  // useEffect(() => {
  //   dispatch(getAllUsers());
  // }, [dispatch]);
  // const allUsers = useSelector((state) => state.users); //este no↑

  // useEffect(() => {
  //   dispatch(getAllPets());
  // }, [dispatch]);
  // const allPets = useSelector((state) => state.pets); //este no↑
  // console.log(allPets, "LOGGED");

  function changeHandler(e) {}

  return (
    <>
      <NavBar />
      <div>TradePet</div>
      <button onChange={(e) => changeHandler(e)}></button>
    </>
  );
}
