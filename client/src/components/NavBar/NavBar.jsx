import React from "react";
import { Link } from "react-router-dom";
import { getUserProfile, viewing } from "../../redux/Actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navbar, Dropdown, Avatar, Toast } from "flowbite-react";

export default function NavBar() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  const allPets = useSelector((state) => state.pets);

  const id = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [dispatch, id]);

  const loggedUser = useSelector((state) => state.userProfile);//el loggeduser5 estaba arriba del useEFF, lo puse abajio

  let bell = loggedUser?.interestedUsers?.filter(e => e.viewState === false).length

  function removeToken(ev) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  function closeHandler(e) {
    e.preventDefault();
    let payload = {
      id: loggedUser._id, //dueño
      interestedId: e.target.value,
      petId: e.target.name, // interestedUsers: [{usuariointeresado}{mascotaquequiero},],
    };
    dispatch(viewing(payload))
    dispatch(getUserProfile(loggedUser._id))
  }

  let algo = loggedUser.interestedUsers.map(e => {
    return {
      user : allUsers.filter(a => a._id === e.interestedUser)[0],
      pet : allPets.filter(a => a._id === e.petId)[0],
      viewState : e.viewState
    }
  }
)

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
          label={`🔔${bell}`}
        >
          <Dropdown.Header>
            <span className="block text-sm font-medium truncate">
              Notificaciones
            </span>
          </Dropdown.Header>

          {loggedUser?.interestedUsers?.length ? (
          algo.map((iUser) => (
            iUser.viewState === false ? 
            <Toast key={iUser.user._id}>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                <img src={iUser.user.image} className="h-10 w-10 rounded-full" />
              </div>
              <div className="ml-3 text-sm font-normal">
                <h1>{`${iUser.user.first_name} ${iUser.user.last_name} esta interesado en ${iUser.pet.name}`}</h1>
                <button
                  value={iUser.user._id}
                  name={iUser.pet._id}
                  className="text-yellow-500"
                  onClick={(e) => closeHandler(e)}
                >
                Marcar como leida
                </button>
                <Link to={`/users/${iUser.user._id}`}>
                  <h1 className="text-yellow-500">Ver Perfil</h1>
                </Link>
              </div>
              <Toast.Toggle/>
            </Toast>
             : <></>
          ))
        ) : (
          <>SIN NOTI</>
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
