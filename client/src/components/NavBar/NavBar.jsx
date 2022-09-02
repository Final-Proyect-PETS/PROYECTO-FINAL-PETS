import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, viewing, viewingLike } from "../../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Dropdown, Avatar, Toast } from "flowbite-react";

export default function NavBar() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  const allPets = useSelector((state) => state.pets);

  const id = localStorage.getItem("id");

  const loggedUser = useSelector((state) => state.userProfile); //el loggeduser5 estaba arriba del useEFF, lo puse abajio

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
      petId2: e.target.name,
      userId: e.target.value,
      ownerId: loggedUser._id,
    };
    dispatch(viewing(payload));
    dispatch(getUserProfile(loggedUser._id));
  }

  function closeLikeHandler(e) {
    e.preventDefault();
    let payload = {
      petId2: e.target.name,
      userId: e.target.value,
      ownerId: loggedUser._id,
    };
    dispatch(viewingLike(payload));
    dispatch(getUserProfile(loggedUser._id));
  }

  let algo = loggedUser?.interestedUsers?.map((e) => {
    return {
      user: allUsers.filter((a) => a._id === e.interestedUser)[0],
      pet: allPets.filter((a) => a._id === e.petId)[0],
      viewState: e.viewState,
    };
  });

  let interest = loggedUser?.interestedUsers?.map((e) => {
    return {
      user: allUsers?.filter((a) => a._id === e.interestedUser)[0],
      pet: allPets?.filter((a) => a._id === e.petId)[0],
      viewState: e.viewState,
      esIntrest: true,
    };
  });

  let like = loggedUser?.likesPets?.map((e) => {
    return {
      user: allUsers?.filter((a) => a._id === e.userId)[0],
      pet: allPets?.filter((a) => a._id === e.petId)[0],
      viewState: e.support,
      esLike: true,
    };
  });

  let notis = [interest, like];
  let notisFlat = notis.flat().sort(() => {
    return Math.random() - 0.5;
  });
  let notiSlice = notis.flat().reverse().slice(0, 5);
  console.log(notiSlice, "SLICE");
  let bell = notis?.flat().filter((noti) => noti?.viewState === false);

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
          label={`🔔${bell.length >= 1 ? bell.length : 0}`}
        >
          <Dropdown.Header>
            <span className="block text-sm font-medium truncate">
              Notificaciones
            </span>
          </Dropdown.Header>
          {notiSlice?.length ? (
            notiSlice?.map((iUser) =>
              iUser?.viewState === false && iUser?.esIntrest === true ? (
                <Toast key={iUser?.user?._id}>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                    <img
                      src={iUser?.user?.image}
                      className="h-10 w-10 rounded-full"
                      alt="imagen de usuario"
                    />
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    <h2>{`❕❔ ${iUser?.user?.first_name} ${iUser?.user?.last_name} esta interesado en ${iUser?.pet?.name}`}</h2>

                    <button
                      value={iUser?.user?._id}
                      name={iUser?.pet?._id}
                      className="text-yellow-500 py-1"
                      onClick={(e) => closeHandler(e)}
                    >
                      Marcar como leida
                    </button>
                    <Link to={`/users/${iUser?.user?._id}`}>
                      <h2 className="text-yellow-500">Ver Perfil</h2>
                    </Link>
                  </div>
                  <Toast.Toggle />
                </Toast>
              ) : iUser?.viewState === false && iUser?.esLike === true ? (
                <Toast key={iUser?.user?._id}>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
                    <img
                      src={iUser?.user?.image}
                      className="h-10 w-10 rounded-full"
                      alt="imagen de usuario"
                    />
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    <h2>{`🤎 A ${iUser?.user?.first_name} ${iUser?.user?.last_name} le gusta ${iUser?.pet?.name}`}</h2>
                    <button
                      value={iUser?.user?._id}
                      name={iUser?.pet?._id}
                      className="text-yellow-500 py-1"
                      onClick={(e) => closeLikeHandler(e)}
                    >
                      Marcar como leida
                    </button>

                    <Link to={`/users/${iUser?.user?._id}`}>
                      <h2 className="text-yellow-500">Ver Perfil</h2>
                    </Link>
                  </div>
                  <Toast.Toggle />
                </Toast>
              ) : (
                <></>
              )
            )
          ) : (
            <Dropdown.Item>Sin notificaciones nuevas</Dropdown.Item>
          )}

          <Dropdown.Divider />
          <Link to={"/notifications"}>
            <Dropdown.Item>Ver todas las notificaciones...</Dropdown.Item>
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
            Comunidad/Adopcion
          </Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link class="text-white hover:none" to="/blog">
            Home
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
