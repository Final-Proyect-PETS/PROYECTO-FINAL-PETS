import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage";
import UserDetail from "./components/Details/UserDetail";
import PetDetail from "./components/Details/PetDetail";
import UserRegister from "./components/UserRegister";
import PetRegister from "./components/PetRegister";
import UpdateUser from "./components/Update/UpdateDataUsers";
import UpdatePet from "./components/Update/UpdateDataPet";
import Error404 from "./components/Loaders/Error404";
import { setAuthToken } from "./components/BrowserHistory/setAuthToken";
import { history } from "./components/BrowserHistory/history";
import PrivateRoutes from "./components/PrivateRoute.js/PrivateRoute";
import PrivateAdmin from "./components/PrivateRoute.js/PrivateAdmin";
import AdminView from "./components/AdminView/AdminView";
import Donation from "./components/Donations/Donation";
import TradePet from "./components/TradePet/TradePet";
import AdoptForm from "./components/AdoptForm/AdoptForm";
import InterestedTraders from "../src/components/TradePet/InterestedTraders";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Notifications from "./components/TradePet/Notifications";
import DonationCancelled from "./components/Donations/DonationCancelled";
import DonationPending from "./components/Donations/DonationPending";
import DonationSuccessful from "./components/Donations/DonationSuccessful";
import Chat from "./components/Chat/Chat";
import UserDonations from "./components/Donations/UsersDonations";
import Blog from "./components/Blogsito/Blog.jsx";
import MissingDataRequired from "./components/MissingDataRequired";
import ReportPet from "./components/Reports/ReportPet";
import ReportUser from "./components/Reports/ReportUser";
import { getUserProfile, getAllUsers, getAllPets } from "./redux/Actions/index";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile(id));
      dispatch(getAllUsers());
      dispatch(getAllPets());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes history={history}>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/register"} element={<UserRegister />} />
        <Route path={"/forgotpassword"} element={<ForgotPassword />} />
        <Route
          path={"/587/resetpassword/:id/:token"}
          element={<ResetPassword />}
        />
        <Route element={<PrivateRoutes />}>
          <Route path={"/missingdata"} element={<MissingDataRequired />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/users/:id"} element={<UserDetail />} />
          <Route path={"/pet/:id"} element={<PetDetail />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/petregister"} element={<PetRegister />} />
          <Route path={"/updateuser"} element={<UpdateUser />} />
          <Route path={"/updatepet"} element={<UpdatePet />} />
          <Route path={"/tradepet"} element={<TradePet />} />
          <Route path={"/interestedtraders"} element={<InterestedTraders />} />
          <Route path={"/notifications"} element={<Notifications />} />
          <Route path={"/adopt/:id"} element={<AdoptForm />} />
          <Route path={"/chat"} element={<Chat />} />
          <Route path={"/donations"} element={<Donation />} />
          <Route
            path={"/donationsuccessful"}
            element={<DonationSuccessful />}
          />
          <Route path={"/donationcancelled"} element={<DonationCancelled />} />
          <Route path={"/donationpending"} element={<DonationPending />} />
          <Route path={"*"} element={<Error404 />} />
          <Route path={"/mydonations/:id"} element={<UserDonations />} />
          <Route path={"/blog"} element={<Blog />} />
          <Route path={"/reportpet"} element={<ReportPet />} />
          <Route path={"/reportuser"} element={<ReportUser />} />
        </Route>
        <Route element={<PrivateAdmin />}>
          <Route path={"/admin"} element={<AdminView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
