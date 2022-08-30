import React from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navbar, Dropdown, Avatar, Toast } from "flowbite-react";

export default function NavBar() {
  const dispatch = useDispatch();

  const id = localStorage.getItem("id");

  const loggedUser = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  function removeToken(ev) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  function closeHandler(e) {
    e.preventDefault();
    console.log("click");
  }

  return (

    <Navbar fluid={false} rounded={false} class="text-white bg-yellow-500 p-3">
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

        <Dropdown
          class="bg-yellow-600 rounded-full mr-5 mt-1"
          label={`🔔${loggedUser?.interestedUsers?.length}`}
        >
          <Dropdown.Header>
            <span className="block text-sm font-medium truncate">
              Notificaciones
            </span>
          </Dropdown.Header>

          {loggedUser?.interestedUsers?.length ? (
            loggedUser?.interestedUsers?.map((iUser) =>
              iUser[2] === false ? (
                <Dropdown.Item>
                  <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                      <img
                        src={iUser[0].image}
                        className="h-10 w-10 rounded-full"
                        alt="imagen de usuario"
                      />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                      <h1>
                        {iUser[0].first_name} {iUser[0].last_name} esta
                        interesado en {iUser[1].name}
                      </h1>
                      <Link to={`/users/${iUser[0]._id}`}>
                        <h1 className="text-yellow-500">Ver Perfil</h1>
                      </Link>
                    </div>
                    <button
                      className="text-yellow-500"
                      onClick={(e) => closeHandler(e)}
                    >
                      <Toast.Toggle onClick={(e) => closeHandler(e)} />
                    </button>
                  </Toast>
                </Dropdown.Item>
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}

          <Dropdown.Divider />
          <Link to={"/notifications"}>
            <Dropdown.Item>Ver todas las notificaciones</Dropdown.Item>
          </Link>
        </Dropdown>

        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar alt="User settings" img={loggedUser.image} rounded={true} />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {loggedUser.first_name} {loggedUser.last_name}
            </span>
            <span className="block truncate text-sm font-medium">
              {loggedUser.email}
            </span>
          </Dropdown.Header>
          <Link to={"/users/" + id}>
            <Dropdown.Item>Perfil de Usuario</Dropdown.Item>
          </Link>
          <Link to="/notifications">
            <Dropdown.Item>Notificaciones</Dropdown.Item>
          </Link>
          <Link to={"/mydonations/" + id}>
            <Dropdown.Item>Mis donaciones</Dropdown.Item>
          </Link>
          {loggedUser.isAdmin === true ? (
            <Link to="/admin">
              <Dropdown.Item>Vista de admin</Dropdown.Item>
            </Link>
          ) : (
            false
          )}

          <Dropdown.Divider />
          <Link to="/" onClick={removeToken}>
            <Dropdown.Item>Cerrar Sesión</Dropdown.Item>
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
        <Navbar.Link class="text-white hover:none">
          <Link to="/donations">Donaciones</Link>
        </Navbar.Link>
        <Navbar.Link class="text-white hover:none">
          <Link to="/about">Sobre Nosotros</Link>
        </Navbar.Link>
        <Navbar.Link class="text-white hover:none">
          <Link to="/navbars">Centro de denuncias</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
