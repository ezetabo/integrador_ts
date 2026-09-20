import type { IUser, IUserRegistro } from "../../../types/IUser";
import { Rol } from "../../../types/Rol";
import { getUsuarios, saveUser } from "../../../utils/auth";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const usuarios = getUsuarios();

  let usuarioEncontrado: IUserRegistro | null = null;
  for (const usuario of usuarios) {
    if (usuario.email === valueEmail && usuario.password === valuePassword) {
      usuarioEncontrado = usuario;
    }
  }

  if (!usuarioEncontrado) {
    mensaje.textContent = "Email o contraseña incorrectos.";
    return;
  }

  const sesion: IUser = {
    email: usuarioEncontrado.email,
    role: usuarioEncontrado.role,
    loggedIn: true,
  };

  saveUser(sesion);

  if (sesion.role === Rol.Admin) {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});
