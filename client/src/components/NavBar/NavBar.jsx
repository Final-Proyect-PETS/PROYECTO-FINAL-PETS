import React from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";

export default function NavBar() {
  const dispatch = useDispatch();

  const id = localStorage.getItem("id");

  const user = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  function removeToken(ev) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  return (
    // <nav className="bg-amber-800 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-amber-800 w-screen">
    //   <div className="container flex flex-wrap justify-between items-center mx-auto">
    //     <Link to="/home" className="flex items-center">
    //       <img
    //         src="https://cdn-icons-png.flaticon.com/512/194/194279.png"
    //         className="mr-3 h-6 sm:h-9"
    //         alt="logo icon"
    //       />

    //       <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
    //         Happy Tails
    //       </span>
    //     </Link>
    //     <div className="flex items-center md:order-2">
    //       <Link to={"/users/" + id}>
    //         <button
    //           type="button"
    //           className="flex mr-3 text-sm justify-center items-center gap-3 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    //           id="user-menu-button"
    //           aria-expanded="false"
    //           data-dropdown-toggle="user-dropdown"
    //           data-dropdown-placement="bottom"
    //         >
    //           <img
    //             className="w-8 h-8 rounded-full"
    //             src={user.image}
    //             alt="foto perfil"
    //           />
    //           <h4 className=" text-white font-bold">
    //             {user.first_name} {user.last_name}
    //           </h4>
    //           <Link to="/notifications">
    //                   <button className="bg-amber-800  hover:bg-green-900   text-white font-bold py-1 px-1 border border-yellow-700 rounded-full">
    //                     <h2 className="font-semibold">{`🔔${user?.interestedUsers?.length}`}</h2>{/* OJO PROMESA */}
    //                   </button>
    //                 </Link>
    //         </button>
    //       </Link>
    //       <div>
    //         <button onClick={removeToken}>
    //           <Link to="/">
    //             <h4 className="ml-3 text-white">Cerrar Sesión</h4>
    //           </Link>
    //         </button>
    //       </div>
    //      
    //       <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-amber-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-amber-800 dark:bg-amber-800 md:dark:bg-amber-800 dark:border-amber-700">
    //         <li>

    <Navbar
      fluid={false}
      rounded={false}
      class="text-white bg-yellow-500 p-3"
    >
      <Link to="/home">
        <Navbar.Brand>
          <img
            src="https://cdn-icons-png.flaticon.com/512/194/194279.png"
            className="mr-3 h-6 sm:h-9"
            alt="Happy Tails logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Happy Tails
          </span>
        </Navbar.Brand>
      </Link>
      <div className="flex md:order-2">
        <Link to="/notifications" className="m-1">
          <button className="bg-amber-800 hover:bg-green-700  text-white font-normal py-1 px-1 border border-yellow-700 rounded-full">
            {`🔔${user?.interestedUsers?.length}`}{/* OJO PROMESA */}
          </button>
        </Link>
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={<Avatar alt="User settings" img={user.image} rounded={true} />}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {user.first_name} {user.last_name}
            </span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Link to={"/users/" + id}>
            <Dropdown.Item>
              Perfil de Usuario
            </Dropdown.Item>
          </Link>
          <Link to="/notifications">
            <Dropdown.Item>
              Notificaciones
            </Dropdown.Item>
          </Link>

          <Dropdown.Item>
            Mis donaciones
          </Dropdown.Item>
          <Dropdown.Divider />
          <Link to="/" onClick={removeToken}>
            <Dropdown.Item>
              Cerrar Sesión
            </Dropdown.Item>
          </Link>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link>
          <Link to="/home" class="text-white hover:none">
            Inicio
          </Link>
        </Navbar.Link>
        <Navbar.Link class="text-white hover:none" >
          <Link to="/donations" >
            Donaciones
          </Link>
        </Navbar.Link>
        <Navbar.Link class="text-white hover:none">
          <Link to="/about">
            Sobre Nosotros
          </Link>
        </Navbar.Link>
        <Navbar.Link class="text-white hover:none">
          <Link to="/navbars">
            Centro de denuncias
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
