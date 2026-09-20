import { protegerRuta } from "../../../main";
import { Rol } from "../../../types/Rol";
import { logout } from "../../../utils/auth";

protegerRuta(Rol.Admin);

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout.addEventListener("click", () => {
  logout();
});
